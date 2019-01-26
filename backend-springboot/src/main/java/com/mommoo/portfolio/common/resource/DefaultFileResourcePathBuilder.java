package com.mommoo.portfolio.common.resource;

import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * This class implements ResourcePathBuilder's way of finding resource where normal file module.
 *
 * @author mommoo
 */
public class DefaultFileResourcePathBuilder implements ResourcePathBuilder {

    @Override
    public Path buildToAbsolutePath(String relativePath) {
        URL url = DefaultFileResourcePathBuilder.class
                .getClassLoader()
                .getResource(relativePath);

        if (url == null) {
            return null;
        }

        try {
            return Paths.get(url.toURI());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
