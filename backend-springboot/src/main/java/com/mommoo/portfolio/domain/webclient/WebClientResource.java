package com.mommoo.portfolio.domain.webclient;

import com.mommoo.portfolio.common.context.Context;
import com.mommoo.portfolio.common.resource.ImageResourceFinder;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * This class is basic resource of creating WebClientData.
 * WebClientData should have image path that can request to this server.
 * So, there is a function of finding image path. {@link #findImageFile(String)}, {@link WebClientImageResourceFinder}
 * The target directory path of image file is a two paths.
 *
 * one is a common directory that have images for public use.
 * the other is a specific project directory that have images for using only specific project.
 *
 * common and specific project's directory name will be decided by {@link #resourceDirectoryNames}
 * , {@link #getResourceDirectoryNamesToFind(String...)}, {@link #defaultFileNamesToFind}
 *
 * @author mommoo
 */
public class WebClientResource {
    private static final String[] defaultFileNamesToFind = {"common"};
    private final String[] resourceDirectoryNames;
    private final String domainPath;
    private final WebClientImageResourceFinder imageResourceFinder;

    WebClientResource(Context context, String domainPath, String... additionalDirectoryPath) {
        this.resourceDirectoryNames = getResourceDirectoryNamesToFind(additionalDirectoryPath);
        this.domainPath = domainPath;
        this.imageResourceFinder = createWebClientImageResourceFinder(context);
    }

    public String findImageFile(String imageName) {
        return this.domainPath + "/" + this.imageResourceFinder.findRelativeImageFile(imageName);
    }

    private WebClientImageResourceFinder createWebClientImageResourceFinder(Context context) {
        String absoluteImageRepositoryPath = context.getAssets().getAbsoluteImageDirectoryPath();

        String[] resourceDirectoryPathsToFind = Arrays.stream(resourceDirectoryNames)
                .map(directoryName-> absoluteImageRepositoryPath + File.separator + directoryName)
                .collect(Collectors.toList())
                .toArray(new String[resourceDirectoryNames.length]);

        ImageResourceFinder imageResourceFinder = ImageResourceFinder
                .builder()
                .absoluteDirectoryPaths(resourceDirectoryPathsToFind)
                .build();

        return WebClientImageResourceFinder
                .builder()
                .imageResourceFinder(imageResourceFinder)
                .absoluteWebDirectoryPath(context.getAbsoluteWebDirectoryPath())
                .build();
    }

    private String[] getResourceDirectoryNamesToFind(String... imageDirectoryNames) {
        List<String> directoryNameList = new ArrayList<>();
        directoryNameList.addAll(Arrays.asList(defaultFileNamesToFind));
        directoryNameList.addAll(Arrays.asList(imageDirectoryNames));

        int size = directoryNameList.size();
        return directoryNameList.toArray(new String[size]);
    }
}
