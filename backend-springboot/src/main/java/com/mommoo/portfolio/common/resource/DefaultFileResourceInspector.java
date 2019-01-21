package com.mommoo.portfolio.common.resource;

import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * This class implements ResourceInspector's way of finding resource where normal file module.
 *
 * @author mommoo
 */
class DefaultFileResourceInspector extends ResourceInspector {
    @Override
    public String findResourceRelativePath(String startRelativePath, String resourceName) {
        Path absoluteDirectoryPath = getAbsoluteDirectoryPath(startRelativePath);
        Path foundResourceAbsolutePath = findResourceAbsolutePath(absoluteDirectoryPath, resourceName);

        if (foundResourceAbsolutePath == null) {
            return "";
        }

        String sAbsoluteDirectoryPath = absoluteDirectoryPath.toUri().getPath();
        String needToRemovePrefixPath = sAbsoluteDirectoryPath
                .substring(0, sAbsoluteDirectoryPath.lastIndexOf(startRelativePath));

        // default file system's file separator different to each os so, using uri(/) pattern
        String foundResourceImageUriPath = foundResourceAbsolutePath.toUri().getPath();
        if (foundResourceImageUriPath.startsWith(needToRemovePrefixPath)) {
            return foundResourceImageUriPath.substring(needToRemovePrefixPath.length());
        }

        return "";
    }

    private Path getAbsoluteDirectoryPath(String resourceDirectoryPath) {
        URL url = DefaultFileResourceInspector.class
                .getClassLoader()
                .getResource(resourceDirectoryPath);
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
