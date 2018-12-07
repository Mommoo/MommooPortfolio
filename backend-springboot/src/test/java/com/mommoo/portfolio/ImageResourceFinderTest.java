package com.mommoo.portfolio;

import com.mommoo.portfolio.common.context.Context;
import com.mommoo.portfolio.common.context.ContextProvider;
import com.mommoo.portfolio.domain.resource.ImageResourceFinder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.util.Arrays;
import java.util.stream.Collectors;

import static org.junit.Assert.assertTrue;
/**
 * This class is test of {@link ImageResourceFinder}
 * For testing, have to preparing two image files
 * And those have to located in image directory path {@link Context.Assets#getAbsoluteImageDirectoryPath()}
 * {@link ImageResourceFinderTest#RELATIVE_DIRECTORY_PATH},
 * {@link ImageResourceFinderTest#FINDING_FILE_NAME}
 *
 * @author mommoo
 */
@RunWith(SpringRunner.class)
@SpringBootTest(properties = "classpath:application.test.properties")
public class ImageResourceFinderTest {
    private static final String[] RELATIVE_DIRECTORY_PATH = {"common", "svg"};
    private static final String[] FINDING_FILE_NAME = {"blog", "android"};

    @Autowired
    private ContextProvider contextProvider;

    @Test
    public void testFindImageFiles() {
        Context.Assets assets = contextProvider.getContext().getAssets();

        String[] absoluteFilePaths = Arrays
                .stream(RELATIVE_DIRECTORY_PATH)
                .map(relativePath-> assets.getAbsoluteImageDirectoryPath() + File.separator + relativePath)
                .collect(Collectors.toList())
                .toArray(new String[RELATIVE_DIRECTORY_PATH.length]);

        ImageResourceFinder imageResourceFinder
                = ImageResourceFinder
                .builder()
                .absoluteDirectoryPaths(absoluteFilePaths)
                .build();

        Arrays.stream(FINDING_FILE_NAME)
                .map(imageResourceFinder::findAbsoluteImageFilePath)
                .forEach(foundImageName -> assertTrue(isAnyContainDirectoryPaths(absoluteFilePaths, foundImageName)));
    }

    private static boolean isAnyContainDirectoryPaths(String[] absoluteDirectoryPaths, String foundFilePath) {
        return Arrays.stream(absoluteDirectoryPaths)
                .peek(absoluteDirectoryPath -> {
                    System.out.println("===================================================================");
                    System.out.println("target directory : " + absoluteDirectoryPath);
                    System.out.println("found image file : " + foundFilePath);
                })
                .anyMatch(foundFilePath::contains);
    }
}
