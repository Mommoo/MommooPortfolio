package com.mommoo.portfolio.domain.resource;

import lombok.ToString;

import java.util.HashMap;

/**
 * This class is persistence data class that provide static-resource file path
 *
 * {@link #repositoryPath} is root path of static-resource
 * {@link #icon} is icon file name finder (ex. if input "youtube", return to "youtube.svg")
 *
 * @author mommoo
 */
@ToString
public class Resource {
    private String repositoryPath;
    private HashMap<String, String> icon;

    public String getIconFilePath(String iconName) {
        String iconFileName = icon.get(iconName);
        if ( iconFileName == null ) {
            return "";
        }

        return getFilePath(iconFileName);
    }

    public String getFilePath(String resourceFileName) {
        return repositoryPath + "/" + resourceFileName;
    }
}
