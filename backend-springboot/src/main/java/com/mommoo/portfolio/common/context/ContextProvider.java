package com.mommoo.portfolio.common.context;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.regex.Matcher;

/**
 * This class create {@link Context} instance and provide it.
 * Context be created using data declared at application.properties file {@see classpath:application.properties file}.
 *
 * The key values declared in this class is to key data of application.properties file.
 *
 * It will building assets's{@link Context.Assets} path compatible any OS system by using API {@link File#separator}.
 *
 * @author mommoo
 */
@Component
public class ContextProvider {
    private static final String CONTEXT_PATH_PROPERTY_KEY = "server.servlet.context-path";
    private static final String STATIC_RESOURCE_LOCATION_KEY = "spring.resources.static-locations";
    private static final String ASSETS_DIRECTORY_NAME_KEY = "resource.assets-directory-name";
    private static final String IMAGE_DIRECTORY_NAME_KEY = "resource.assets.image-directory-name";
    private static final String THEME_COLOR_PROPERTY_KEY = "theme.color";
    private Environment environment;

    @Autowired
    public ContextProvider(Environment environment) {
        this.environment = environment;
    }

    public Context getContext() {
        return Context.builder()
                .contextPath(this.environment.getProperty(CONTEXT_PATH_PROPERTY_KEY))
                .absoluteWebDirectoryPath(getAbsoluteWebDirectoryPath())
                .assets(createContextAssets())
                .themeColor(this.environment.getProperty(THEME_COLOR_PROPERTY_KEY))
                .build();
    }

    private Context.Assets createContextAssets() {
        return Context.Assets.builder()
                .absolutePath(getAbsoluteAssetsDirectoryPath())
                .relativePath(getRelativeAssetsDirectoryPath())
                .absoluteImageDirectoryPath(getAbsoluteImageDirectoryPath())
                .relativeImageDirectoryPath(getRelativeImageDirectoryPath())
                .build();
    }

    private String getAbsoluteWebDirectoryPath() {
        String absoluteAssetsDirectoryPath = getAbsoluteAssetsDirectoryPath();
        String relativeAssetsDirectoryPath = getRelativeAssetsDirectoryPath();
        return absoluteAssetsDirectoryPath.substring(0, absoluteAssetsDirectoryPath.lastIndexOf(relativeAssetsDirectoryPath) - 1);
    }

    private String getRelativeWebDirectoryPath() {
        String staticResourceLocations = this.environment.getProperty(STATIC_RESOURCE_LOCATION_KEY);
        String classPathPrefix = "classpath:/";

        String path = staticResourceLocations;
        if ( staticResourceLocations.startsWith(classPathPrefix) ) {
            path = staticResourceLocations.substring(classPathPrefix.length());
        }

        String OSCompatiblePath = path.replaceAll("/", Matcher.quoteReplacement(File.separator));

        return OSCompatiblePath;
    }

    private String getRelativeAssetsDirectoryPath() {
        return this.environment.getProperty(ASSETS_DIRECTORY_NAME_KEY);
    }

    private String getAbsoluteAssetsDirectoryPath() {
        String assetsDirectoryResourcePath = "classpath:" + getRelativeWebDirectoryPath() + File.separator + getRelativeAssetsDirectoryPath();
        try {
            return ResourceUtils.getFile(assetsDirectoryResourcePath).getPath();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return "";
        }
    }

    private String getAbsoluteImageDirectoryPath() {
        String imageDirectoryName = this.environment.getProperty(IMAGE_DIRECTORY_NAME_KEY);
        return getAbsoluteAssetsDirectoryPath() + File.separator + imageDirectoryName;
    }

    private String getRelativeImageDirectoryPath() {
        String imageDirectoryName = this.environment.getProperty(IMAGE_DIRECTORY_NAME_KEY);
        return getRelativeAssetsDirectoryPath()+ File.separator + imageDirectoryName;
    }
}
