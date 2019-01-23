package com.mommoo.portfolio.common.resource;

import com.mommoo.portfolio.common.context.ContextEnvironment;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;

/**
 * This class provides way of finding resource file where the project module.
 * The resource's source location is provided project context data. {@link ContextEnvironment}
 * The way of inspecting that the resource is exist
 * or getting the resource path is different by project uri policy.
 * so to deal with it, we should use proper resource inspector. {@link ResourceInspector}
 *
 * @author mommoo
 */
@Component
public class ResourceFinder {
    private ContextEnvironment contextEnvironment;
    private ResourceInspector resourceInspector;

    public ResourceFinder(ContextEnvironment contextEnvironment) {
        this.contextEnvironment= contextEnvironment;
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

    public String findImageResourcePath(String resourceName, String[] startResourcePaths) {
        if (Strings.isEmpty(resourceName)) {
            return "";
        }

        int resourceLocationNameLen = contextEnvironment.getResourceLocationName().length();
        String imageRepositoryPath = contextEnvironment.getImageRepositoryPath();
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
