package com.mommoo.portfolio.common.resource;

import org.apache.logging.log4j.util.Strings;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;

/**
 * This class provides way of finding resource file where the project module.
 * The resource's source location is declared at the application properties file.
 * The way of inspecting that the resource is exist
 * or getting the resource path is different by project uri policy.
 * so to deal with it, we should use proper resource inspector. {@link ResourceInspector}
 *
 * @author mommoo
 */
@Component
public class ResourceFinder {
    private static final String resourceLocationKey = "spring.resources.static-locations";
    private static final String getAssetsDirectoryNameKey = "resource.assets-directory-name";
    private static final String getImageDirectoryNameKey = "resource.assets.image-directory-name";

    private Environment environment;
    private ResourceInspector resourceInspector;

    public ResourceFinder(Environment environment) {
        this.environment = environment;
        this.resourceInspector
                = isJarProject() ? new JarFileResourceInspector() : new DefaultFileResourceInspector();
    }

    private static boolean isJarProject() {
        try {
            URI domainURI = ResourceFinder.class.getProtectionDomain().getCodeSource().getLocation().toURI();
            return domainURI.getScheme().equals("jar");
        } catch (URISyntaxException e) {
            e.printStackTrace();
            return false;
        }
    }

    private String getResourceLocationName() {
        return environment
                .getProperty(resourceLocationKey)
                .substring("classpath:/".length());
    }

    private String getImageRepositoryPath() {
        return getResourceLocationName() + "/" +
                environment.getProperty(getAssetsDirectoryNameKey) + "/" +
                environment.getProperty(getImageDirectoryNameKey);
    }

    public String findImageResourcePath(String resourceName, String[] startResourcePaths) {
        if (Strings.isEmpty(resourceName)) {
            return "";
        }

        int resourceLocationNameLen = getResourceLocationName().length();
        String imageRepositoryPath = getImageRepositoryPath();
        return Arrays.stream(startResourcePaths)
                .filter(Strings::isNotEmpty)
                .map(path -> imageRepositoryPath+"/"+path)
                .map(path -> this.resourceInspector.findResourceRelativePath(path, resourceName))
                .filter(Strings::isNotEmpty)
                .map(imagePath -> imagePath.substring(resourceLocationNameLen))
                .findFirst()
                .orElse("");
    }
}
