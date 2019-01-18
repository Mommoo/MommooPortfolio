package com.mommoo.portfolio.common.context;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * This class is the context data of the mommoo-portfolio project
 * It is created by {@link ContextProvider}
 *
 * {@link Context#contextPath} is root web resource path which be published to web client user.
 * {@link Context#absoluteWebDirectoryPath} is absolute web directory path
 *  that is real file path used on server file system
 * {@link Context#assets} is absolute assets directory path. assets have all static file
 *  accept web static file such as html, css, js file {@link Assets}
 *
 * @author mommoo
 */
@Builder
@Getter
@ToString
public class Context {
    private final String contextPath;
    private final String absoluteWebDirectoryPath;
    private final Assets assets;

    /**
     * This class is provides directory paths that involved assets resources.
     * Provided paths is real server file system path compatible to any OS System.
     *
     * Assets resources have program static resources files that have the image file repository.
     * (in this time, Assets resource have only image repository)
     *
     * Assets relative path source is absolute web resource path {@link Context#absoluteWebDirectoryPath}
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
