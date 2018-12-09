package com.mommoo.portfolio.domain.project.webclient;

import com.mommoo.portfolio.common.context.Context;
import com.mommoo.portfolio.common.resource.ImageResourceFinder;
import com.mommoo.portfolio.domain.project.BasicProject;
import lombok.Builder;

import java.io.File;
import java.util.Arrays;
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
 * common and specific project's directory name will be decided by {@link #getResourceDirectoryNamesToFind()}
 *
 * @author mommoo
 */
public class WebClientResource {
    private BasicProject project;
    private WebClientImageResourceFinder imageResourceFinder;

    @Builder
    WebClientResource(Context context, BasicProject project) {
        this.project = project;
        this.imageResourceFinder = createWebClientImageResourceFinder(context);
    }

    public BasicProject getProject() {
        return project;
    }

    public String findImageFile(String imageName) {
        return this.imageResourceFinder.findImageFile(imageName);
    }

    private WebClientImageResourceFinder createWebClientImageResourceFinder(Context context) {
        String absoluteImageRepositoryPath = context.getAssets().getAbsoluteImageDirectoryPath();
        String[] resourceDirectoryNames = getResourceDirectoryNamesToFind();

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

    private String[] getResourceDirectoryNamesToFind() {
        return new String[]{"common", this.project.getName()};
    }
}
