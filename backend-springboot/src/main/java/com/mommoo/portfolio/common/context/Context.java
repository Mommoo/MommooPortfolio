package com.mommoo.portfolio.common.context;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * This class is the context data that can obtain project property values defined by developer
 * It is created by {@link ContextProvider}
 *
 * @author mommoo
 */
@Builder
@Getter
@ToString
public class Context {
    private final String contextPath;
    private final Assets assets;
    private final String themeColor;

    /**
     * This class is provides directory paths that involved assets resources.
     * Provided paths is compatible to any OS System.
     *
     * Assets resources have program static resources files that consisted
     * static web file repository (it is located assets directory root path) and
     * the image file repository.
     */
    @Builder
    @Getter
    @ToString
    public static class Assets {
        private final String absolutePath;
        private final String relativePath;
        private final String absoluteImageDirectoryPath;
        private final String relativeImageDirectoryPath;
    }
}
