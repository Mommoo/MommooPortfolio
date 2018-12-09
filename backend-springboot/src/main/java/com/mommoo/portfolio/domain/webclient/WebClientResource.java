package com.mommoo.portfolio.domain.webclient;

import com.mommoo.portfolio.common.context.Context;
import com.mommoo.portfolio.common.resource.ImageResourceFinder;
import lombok.Builder;

import java.io.File;
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
 * common and specific project's directory name will be decided by {@link #resourceDirectoryNames}, {@link #getResourceDirectoryNamesToFind(String...)}
 *
 * @author mommoo
 */
public class WebClientResource {
    private final String[] resourceDirectoryNames;
    private final WebClientImageResourceFinder imageResourceFinder;

    @Builder
    WebClientResource(Context context, String... imageDirectoryNames) {
        this.resourceDirectoryNames = getResourceDirectoryNamesToFind(imageDirectoryNames);
        this.imageResourceFinder = createWebClientImageResourceFinder(context);
    }

    public String findImageFile(String imageName) {
        return this.imageResourceFinder.findImageFile(imageName);
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
        List<String> directoryNameList = Arrays.asList(imageDirectoryNames);
        directoryNameList.add(0, "common");
        int size = directoryNameList.size();
        return directoryNameList.toArray(new String[size]);
    }
}
