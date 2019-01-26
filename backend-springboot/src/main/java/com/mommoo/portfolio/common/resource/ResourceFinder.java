package com.mommoo.portfolio.common.resource;

import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * This class provides way of finding resource file where the project module.
 * The way of inspecting that the resource is exist
 * or getting the resource path is different by project uri policy.
 * so to deal with it, we should use proper resource builder. {@link ResourcePathBuilder}
 *
 * @author mommoo
 */
@Service
public class ResourceFinder {
    private ResourcePathBuilder resourcePathBuilder;

    public ResourceFinder() {
        this.resourcePathBuilder = ResourceBuilderFactory.createResourceInspector();
    }

    public List<String> findResourcesInDirectory(String relativePath) {
        if (Strings.isEmpty(relativePath)) {
            return Collections.emptyList();
        }

        Path absolutePath = this.resourcePathBuilder.buildToAbsolutePath(relativePath);

        if (absolutePath == null) {
            return Collections.emptyList();
        }

        if (Files.notExists(absolutePath) || !Files.isDirectory(absolutePath)) {
            return Collections.emptyList();
        }

        try {
            return Files.list(absolutePath)
                    .filter(path -> !Files.isDirectory(path))
                    .map(Path::toAbsolutePath)
                    .map(Path::toString)
                    .collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
