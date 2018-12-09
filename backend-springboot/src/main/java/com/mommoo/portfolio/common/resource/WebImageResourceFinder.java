package com.mommoo.portfolio.common.resource;

import lombok.Builder;

import java.io.File;
import java.util.regex.Matcher;

/**
 * It is decorating class of {@link ImageResourceFinder}
 * This class convert from server file path to web resource file path desired by web client user
 * {@link WebImageResourceFinder#findWebClientImageFile(String)}
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
    public String findWebClientImageFile(String fileName) {
        String absoluteImageFilePath = this.imageResourceFinder.findAbsoluteImageFilePath(fileName);
        if ( absoluteImageFilePath.contains(absoluteWebDirectoryPath) ) {

            int beginIndex = absoluteImageFilePath.indexOf(absoluteWebDirectoryPath) + absoluteWebDirectoryPath.length();
            /* relative path should be not containing separator */
            beginIndex++;
            return absoluteImageFilePath
                    .substring(beginIndex)
                    .replaceAll(Matcher.quoteReplacement(File.separator), "/");
        }

        return "";
    }
}
