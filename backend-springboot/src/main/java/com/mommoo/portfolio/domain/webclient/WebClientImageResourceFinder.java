package com.mommoo.portfolio.domain.webclient;

import com.mommoo.portfolio.common.resource.ImageResourceFinder;
import lombok.Builder;

import java.io.File;
import java.util.regex.Matcher;

/**
 * It is decorating class of {@link ImageResourceFinder}
 * This class convert from server file path to web resource file path desired by web client user
 * {@link WebClientImageResourceFinder#findRelativeImageFile(String)}
 *
 * @author mommoo
 */
class WebClientImageResourceFinder {
    private final ImageResourceFinder imageResourceFinder;
    private final String absoluteWebDirectoryPath;

    @Builder
    WebClientImageResourceFinder(ImageResourceFinder imageResourceFinder, String absoluteWebDirectoryPath) {
        this.imageResourceFinder = imageResourceFinder;
        this.absoluteWebDirectoryPath = absoluteWebDirectoryPath;
    }

    /** provides an image path that the web client can using at browser environment */
    String findRelativeImageFile(String fileName) {
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
