package com.mommoo.portfolio.domain.webclient;

import com.mommoo.portfolio.common.resource.ImageResourceFinder;
import lombok.Builder;

import java.io.File;
import java.util.Arrays;
import java.util.regex.Matcher;

/**
 * It is decorating class of {@link ImageResourceFinder}
 * This class convert from server file path to web resource file path desired by web client user
 * {@link WebClientImageResourceFinder#findRelativeImageFile(String)}
 *
 * @author mommoo
 */
class WebClientImageResourceFinder {
    private final String absoluteWebDirectoryPath;
    private final ImageResourceFinder[] imageResourceFinders;

    WebClientImageResourceFinder(String absoluteWebDirectoryPath, ImageResourceFinder... imageResourceFinders) {
        this.absoluteWebDirectoryPath = absoluteWebDirectoryPath;
        this.imageResourceFinders = imageResourceFinders;
    }

    /** provides an image path that the web client can using at browser environment */
    String findRelativeImageFile(String fileName) {

        return Arrays
                .stream(this.imageResourceFinders)
                .map(imageFinder -> imageFinder.findAbsoluteImageFilePath(fileName))
                .filter(foundImageFile -> foundImageFile.lastIndexOf(fileName) != -1)
                .map(this::convertToWebImageFilePath)
                .findFirst()
                .orElse("");
    }

    private String convertToWebImageFilePath(String absoluteFileImagePath) {
        if ( !absoluteFileImagePath.contains(absoluteWebDirectoryPath) ) {
            return "";
        }

        int beginIndex = absoluteFileImagePath.indexOf(absoluteWebDirectoryPath) + absoluteWebDirectoryPath.length();
        /* relative path should be not containing separator */
        beginIndex++;
        return absoluteFileImagePath
                .substring(beginIndex)
                .replaceAll(Matcher.quoteReplacement(File.separator), "/");
    }
}
