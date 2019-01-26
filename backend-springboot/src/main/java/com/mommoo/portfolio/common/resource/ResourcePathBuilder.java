package com.mommoo.portfolio.common.resource;

import java.nio.file.Path;

/**
 * @author mommoo
 */
public interface ResourcePathBuilder {
    public Path buildToAbsolutePath(String relativePath);
}
