package com.mommoo.portfolio.common.resource;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * This class create proper {@link ResourcePathBuilder} for file system environment.
 *
 * Actually, because that this project will be run by war file system which default file system
 * or jar file system, we need to two implementation of {@link ResourcePathBuilder}.
 * {@link JarFileResourcePathBuilder} {@link DefaultFileResourcePathBuilder}
 *
 * @author mommoo
 */
class ResourceBuilderFactory {
    private static boolean isJarProject() {
        try {
            URI domainURI
                    = ResourceFinder.class
                    .getProtectionDomain()
                    .getCodeSource()
                    .getLocation()
                    .toURI();
            return domainURI.getScheme().equals("jar");
        } catch (URISyntaxException e) {
            e.printStackTrace();
            return false;
        }
    }

    static ResourcePathBuilder createResourceInspector() {
        return isJarProject() ? new JarFileResourcePathBuilder() :
                new DefaultFileResourcePathBuilder();
    }
}
