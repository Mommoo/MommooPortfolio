package com.mommoo.portfolio.common.resource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Objects;

/**
 * This class have a role of finding resource path.
 * It is only want to specific start paths and the file name
 * and a file extension is the optional.
 *
 * The finding resource is progressed two process.
 * First, if target path is directory, it will process deep search on and on
 * until reaching to end point from start path.
 *
 * Last, finding the resource path by confirm
 * that the resource name is contained to the resource path.
 * If there are two matched resource path, this class will choice the first resource.
 *
 * @author mommoo
 */
abstract class ResourceInspector {
    abstract String findResourceRelativePath(String startRelativePath, String resourceName);

    Path findResourceAbsolutePath(Path resourcePath, String resourceName) {
        if ( resourcePath == null ) {
            return null;
        }

        Path absoluteImagePath = deepFindResourceAbsolutePath(resourcePath, resourceName);
        if ( absoluteImagePath == null ) {
            return null;
        }

        return absoluteImagePath;
    }

    private static Path deepFindResourceAbsolutePath(Path absolutePath, String imageName) {
        if (Files.notExists(absolutePath)) {
            return null;
        }

        if (Files.isDirectory(absolutePath)) {
            try {
                return Files.list(absolutePath)
                        .map(path -> deepFindResourceAbsolutePath(path, imageName))
                        .filter(Objects::nonNull)
                        .findFirst()
                        .orElse(null);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        if (absolutePath.getFileName().toString().contains(imageName)) {
            return absolutePath;
        }

        return null;
    }
}
