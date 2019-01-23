package com.mommoo.portfolio;

import com.mommoo.portfolio.common.resource.ResourceFinder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
/**
 *
 * @author mommoo
 */
@RunWith(SpringRunner.class)
@SpringBootTest(properties = "classpath:application.test.properties")
public class ImageResourceFinderTest {

    @Autowired
    private ResourceFinder resourceFinder;

    @Test
    public void testFindImageFiles() {
        String[] FINDING_FILE_NAME = {"blog", "android"};
        Arrays.stream(FINDING_FILE_NAME).forEach(fileName -> {
            String imagePath = resourceFinder.findImageResourcePath(fileName, new String[]{"common"});
            System.out.println(imagePath);
        });
    }

    @Test
    public void testFindFlatSwingImageFiles() {
        String[] FINDING_FILE_NAME = {"flat_swing_code", "flat_swing_linear_layout.jpg"};
        Arrays.stream(FINDING_FILE_NAME).forEach(fileName -> {
            String imagePath = resourceFinder.findImageResourcePath(fileName, new String[]{"FlatSwing"});
            System.out.println(imagePath);
        });
    }
}
