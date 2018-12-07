package com.mommoo.portfolio.domain.resource;

import lombok.Builder;

/**
 * It is decorating class of {@link ImageResourceFinder}
 * This class convert from server file path to web resource file path desired by web client user
 * {@link WebImageResourceFinder#findImageFilePathFitToWebClient(String)}
 *
 * @author mommoo
 */
public class WebImageResourceFinder {
    private final ImageResourceFinder imageResourceFinder;
    private final String absoluteWebDirectoryPath;

    @Builder
    public WebImageResourceFinder(ImageResourceFinder imageResourceFinder, String absoluteWebDirectoryPath) {
        this.imageResourceFinder = imageResourceFinder;
        this.absoluteWebDirectoryPath = absoluteWebDirectoryPath;
    }

    /** provides an image path that the web client can using at browser environment */
    public String findImageFilePathFitToWebClient(String fileName) {
        String absoluteImageFilePath = this.imageResourceFinder.findAbsoluteImageFilePath(fileName);
        if ( absoluteImageFilePath.contains(absoluteWebDirectoryPath) ) {

            int beginIndex = absoluteImageFilePath.indexOf(absoluteWebDirectoryPath) + absoluteWebDirectoryPath.length();
            /* relative path should be not containing separator */
            beginIndex++;
            return absoluteImageFilePath.substring(beginIndex);
        }

        return "";
    }
}
