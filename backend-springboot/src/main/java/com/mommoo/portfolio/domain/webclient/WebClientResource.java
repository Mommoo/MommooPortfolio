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
 * So, there is a function of finding image path.
 * {@link #findImageFile(String)}, {@link WebClientImageResourceFinder}
 * The target directory path of image file is a two paths.
 *
 * One is a common directory that have images for public use.
 * The other is a specific project directory that have images for using only specific project.
 *
 * Basically, it is provides class factory method.
 * {@link WebClientResource#of(Context, String, String...)}
 * It is also provides another class factory method
 * that find common directory resource in cached object for performance.
 * {@link WebClientResource#ofDefaultCached(Context, String, String...)}
 *
 * common and specific project's directory name will be decided by
 * {@link #getEntireDirectoryNamesToFind(String...)}, {@link #defaultFileNamesToFind}
 *
 * @author mommoo
 */
public class WebClientResource {
    private static final String[] defaultFileNamesToFind = {"common"};
    private static ImageResourceFinder cachedDefaultFileFinder;
    private final String domainPath;
    private final WebClientImageResourceFinder imageResourceFinder;

    private WebClientResource(Context context, String domainPath, ImageResourceFinder... imageResourceFinders) {
        this.domainPath = domainPath;
        this.imageResourceFinder = new WebClientImageResourceFinder(context.getAbsoluteWebDirectoryPath(), imageResourceFinders);
    }

    static WebClientResource of(Context context, String domainPath, String... additionalDirectoryPath) {
        String absoluteImageDirectoryPath = context.getAssets().getAbsoluteImageDirectoryPath();
        cachedDefaultFileFinder = createImageResourceFinder(absoluteImageDirectoryPath, defaultFileNamesToFind);

        String[] entireDirectoryPathsToFind = getEntireDirectoryNamesToFind(additionalDirectoryPath);
        ImageResourceFinder entireResourceFinder = createImageResourceFinder(absoluteImageDirectoryPath, entireDirectoryPathsToFind);

        return new WebClientResource(context, domainPath, entireResourceFinder);
    }

    static WebClientResource ofDefaultCached(Context context, String domainPath, String... additionalDirectoryPath) {
        String absoluteImageDirectoryPath = context.getAssets().getAbsoluteImageDirectoryPath();

        if ( cachedDefaultFileFinder == null ) {
            cachedDefaultFileFinder = createImageResourceFinder(absoluteImageDirectoryPath, defaultFileNamesToFind);
        }

        ImageResourceFinder additionalFileFinder
                = createImageResourceFinder(absoluteImageDirectoryPath, additionalDirectoryPath);

        return new WebClientResource(context, domainPath, cachedDefaultFileFinder, additionalFileFinder);
    }

    public String findImageFile(String imageName) {
        String relativeImageFilePath = this.imageResourceFinder.findRelativeImageFile(imageName);

        if (relativeImageFilePath.equals("")) {
            return "";
        } else {
            return this.domainPath + "/" + relativeImageFilePath;
        }
    }

    private static ImageResourceFinder createImageResourceFinder(String absoluteImageDirectoryPath, String... resourceDirectoryNames) {

        String[] resourceDirectoryPathsToFind = Arrays.stream(resourceDirectoryNames)
                .map(directoryName-> absoluteImageDirectoryPath + File.separator + directoryName)
                .collect(Collectors.toList())
                .toArray(new String[resourceDirectoryNames.length]);

        return ImageResourceFinder
                .builder()
                .absoluteDirectoryPaths(resourceDirectoryPathsToFind)
                .build();
    }

    private static String[] getEntireDirectoryNamesToFind(String... imageDirectoryNames) {
        List<String> directoryNameList = new ArrayList<>();
        directoryNameList.addAll(Arrays.asList(imageDirectoryNames));
        directoryNameList.addAll(Arrays.asList(defaultFileNamesToFind));

        int size = directoryNameList.size();
        return directoryNameList.toArray(new String[size]);
    }
}
