package com.mommoo.portfolio.common.context;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.regex.Matcher;

/**
 * This class create {@link Context} instance and provide it.
 * Context be created using data declared at application.properties file {@see classpath:application.properties file}.
 * The key values declared in this class is to key data of application.properties file.
 *
 * There is two-ways of providing context data.
 * First way is a providing pre-loaded context data {@link #getContext()}
 * last way is a providing new-loaded context data {@link #getLatestContext()}
 *
 * It will also building assets's{@link Context.Assets} path compatible any OS system by using API {@link File#separator}.
 *
 * @author mommoo
 */
@Component
public class ContextProvider {
    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Value("${spring.resources.static-locations}")
    private String resourceLocation;

    @Value("${resource.assets-directory-name}")
    private String assetsDirectoryName;

    @Value("${resource.assets.image-directory-name}")
    private String imageDirectoryName;

    private Context cachedContext;

    @PostConstruct
    private void postConstruct() {
        this.cachedContext = getLatestContext();
    }
    
    /** update context data  */
    public void update() {
        this.cachedContext = getLatestContext();
    }

    public Context getContext() {
        return cachedContext;
    }

    public Context getLatestContext() {
        this.cachedContext = Context.builder()
                .contextPath(contextPath)
                .absoluteWebDirectoryPath(getAbsoluteWebDirectoryPath())
                .assets(createContextAssets())
                .build(); 
        
        return cachedContext;
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
        String staticResourceLocations = this.resourceLocation;
        String classPathPrefix = "classpath:/";
        String path = staticResourceLocations;
        if ( staticResourceLocations.startsWith(classPathPrefix) ) {
            path = staticResourceLocations.substring(classPathPrefix.length());
        }

        String OSCompatiblePath = path.replaceAll("/", Matcher.quoteReplacement(File.separator));

        return OSCompatiblePath;
    }

    private String getRelativeAssetsDirectoryPath() {
        return this.assetsDirectoryName;
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
        String imageDirectoryName = this.imageDirectoryName;
        return getAbsoluteAssetsDirectoryPath() + File.separator + imageDirectoryName;
    }

    private String getRelativeImageDirectoryPath() {
        String imageDirectoryName = this.imageDirectoryName;
        return getRelativeAssetsDirectoryPath()+ File.separator + imageDirectoryName;
    }
}
