package com.mommoo.portfolio.domain.resource;

import lombok.ToString;

import java.util.HashMap;

/**
 * This class is persistence data class that provide static-resource file path
 *
 * {@link #repositoryPath} is root path of static-resource
 * {@link #icon} is icon file name finder
 *
 * icon searching is used only lower case {@link #getIconFilePath(String)}
 *
 * @author mommoo
 */
//TODO 도메인 이미지 영역과 아이콘이 배치되어 있는 영역을 구분할 것.
@ToString
public class Resource {
    private String repositoryPath;
    private HashMap<String, String> icon;

    /** find file path using by `lower case` icon name  */
    public String getIconFilePath(String iconName) {
        String lowerCaseIconName = iconName.toLowerCase();
        String iconFileName = icon.get(lowerCaseIconName);
        if ( iconFileName == null ) {
            return "";
        }

        return getFilePathContainRepositoryPath(iconFileName);
    }

    public String getFilePathContainRepositoryPath(String resourceFileName) {
        return repositoryPath + "/" + resourceFileName;
    }
}
