package com.mommoo.portfolio.common.resource;

import lombok.Builder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 *
 * This class provides function of find image file name through only file name.
 * {@link ImageResourceFinder#findAbsoluteImageFilePath(String)}
 * Range of finding image file is decided by took several absolute directory path passed by constructor.
 * {@link ImageResourceFinder#ImageResourceFinder(String...)}
 * At this class because there is a cache file list which read in advance,
 * if target directory passed from constructor will be updated,
 * this class doesn't responded to something new
 *
 * Thus after finish of using instance, drop it.
 * And then When you need it again, should create a new instance for updated directory.
 *
 * @author mommoo
 */
public class ImageResourceFinder {
    private static final List<String> IMAGE_FILE_EXTENSIONS = Arrays.asList("jpeg", "jpg", "png", "svg");
    private final List<Path> cachedFileList;

    @Builder
    public ImageResourceFinder(String... absoluteDirectoryPaths) {
        this.cachedFileList = Arrays.stream(absoluteDirectoryPaths)
                .map(absoluteDirectoryPath -> Paths.get(absoluteDirectoryPath))
                .flatMap(ImageResourceFinder::createFileListPathStream)
                .collect(Collectors.toList());
    }

    public String findAbsoluteImageFilePath(String imageName) {
        return cachedFileList.stream()
                .filter(filePath -> isMatchedFileName(filePath, imageName))
                .map(Path::toAbsolutePath)
                .map(Path::toString)
                .findFirst()
                .orElse("");
    }

    private static Stream<Path> createFileListPathStream(Path path) {
        try {
            return Files.list(path);
        } catch (IOException e) {
            return Stream.empty();
        }
    }

    private static boolean isMatchedFileName(Path filePath, String imageName) {
        String fileName = filePath.getFileName().toString();
        return fileName.equals(imageName) || isMatchedFileNameWithOutFileExtension(fileName, imageName);
    }

    private static boolean isMatchedFileNameWithOutFileExtension(String fileName, String imageName) {
        String fileNameWithOutExtension = fileName.substring(0, fileName.lastIndexOf("."));
        return !isContainFileExtension(imageName) && fileNameWithOutExtension.equals(imageName);
    }

    private static boolean isContainFileExtension(String fileName) {
        return fileName.contains(".") && IMAGE_FILE_EXTENSIONS.contains(parseFileExtension(fileName));
    }

    /** @return the lowercase file extension which is a type of the {@link ImageResourceFinder#IMAGE_FILE_EXTENSIONS} item */
    private static String parseFileExtension(String fileNameContainedExtensions) {
        int beginIndexOfExtensions = fileNameContainedExtensions.lastIndexOf(".");
        return fileNameContainedExtensions.substring(beginIndexOfExtensions).toLowerCase();
    }
}
