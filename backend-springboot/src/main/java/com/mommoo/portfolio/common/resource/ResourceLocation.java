package com.mommoo.portfolio.common.resource;

import com.mommoo.portfolio.common.utils.FileUtils;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;

/**
 * This class provides the path of project's resource.
 * The path matched to project resource file structure
 * so, when static resource path change, this class have to be changed too.
 *
 * @author mommoo
 */
@Service
public class ResourceLocation {
    private static final String resourceRootDirectoryName = "assets";
    private static final String imageRootDirectoryName = "images";
    private static final String fileRootDirectoryName ="files";
    private static final String commonImageDirectoryName = "common";
    private static final String paperFileDirectoryName = "paper";

    private static final String imageResourcePath = buildImageResourcePath();
    private static final String fileResourcePath = buildFileResourcePath();

    private static String buildImageResourcePath() {
        return FileUtils.resolveBasicPath(
                Paths.get(resourceRootDirectoryName, imageRootDirectoryName).toString()
        );
    }

    private static String buildFileResourcePath() {
        return FileUtils.resolveBasicPath(
                Paths.get(resourceRootDirectoryName, fileRootDirectoryName).toString()
        );
    }

    public String getImageResourcePath() {
        return imageResourcePath;
    }

    public String getFileResourcePath() {
        return fileResourcePath;
    }

    public String getCommonImageLocationPath() {
        return imageResourcePath + "/" + commonImageDirectoryName;
    }

    public String getProjectImageLocationPath(String projectTitle) {
        return imageResourcePath + "/" + projectTitle;
    }

    public String getCommonFileLocationPath() {
        return fileResourcePath;
    }

    public String getPaperFileLocationPath() {
        return fileResourcePath + "/" + paperFileDirectoryName;
    }
}
