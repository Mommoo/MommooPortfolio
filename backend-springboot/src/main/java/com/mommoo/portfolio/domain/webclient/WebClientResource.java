package com.mommoo.portfolio.domain.webclient;

import com.mommoo.portfolio.common.resource.ResourceFinder;
import org.apache.logging.log4j.util.Strings;

/**
 * This class is providing way of
 * finding image file path using by resource-finder. {@link ResourceFinder}
 *
 * The image path will be packed for web paths. {@link #findImageResourcePath(String)}
 *
 * When finding image path for WebClient, the image resource start path is need to one or two.
 *
 * The WebClientProject {@link WebClientBasicProject}, {@link WebClientNormalProject} is need to
 * the common image resource path and the project image resource path.
 *
 * The other WebClient is need to only common image resource path.
 *
 * @author mommoo
 */
public class WebClientResource {
    private static final String commonStartResourcePath = "common";
    private final ResourceFinder resourceFinder;
    private final String domainPath;
    private final String[] startResourcePaths;

    WebClientResource(ResourceFinder resourceFinder, String domainPath) {
        this.resourceFinder = resourceFinder;
        this.domainPath = domainPath;
        this.startResourcePaths = new String[]{commonStartResourcePath};
    }

    WebClientResource(ResourceFinder resourceFinder, String domainPath, String projectTitle) {
        this.resourceFinder = resourceFinder;
        this.domainPath = domainPath;
        this.startResourcePaths = new String[]{commonStartResourcePath, projectTitle};
    }

    public String findImageResourcePath(String imageName) {
        String resourcePath
                = resourceFinder.findImageResourcePath(imageName, this.startResourcePaths);
        if (Strings.isNotEmpty(resourcePath)) {
            return domainPath + resourcePath;
        }

        return "";
    }
}
