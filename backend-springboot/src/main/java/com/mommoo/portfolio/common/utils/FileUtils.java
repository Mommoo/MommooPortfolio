package com.mommoo.portfolio.common.utils;

import java.nio.file.Path;
import java.util.regex.Matcher;

/**
 * @author mommoo
 */
public class FileUtils {
    private FileUtils(){ }

    public static String parseFileNameWithOutExtensions(Path path) {
        String fileName = path.getFileName().toString();
        int extensionIndex = fileName.lastIndexOf(".");
        if (extensionIndex == -1) {
            return fileName;
        }

        return fileName.substring(0, extensionIndex);
    }

    public static String resolveBasicPath(String string){
        return string.replaceAll(Matcher.quoteReplacement("\\"), "/");
    }
}
