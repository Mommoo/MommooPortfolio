package com.mommoo.portfolio;

import com.mommoo.portfolio.common.context.Context;
import com.mommoo.portfolio.common.context.ContextProvider;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

/**
 * Test ContextProvider{@link ContextProvider} and Context{@link Context}
 *
 * @author mommoo
 */
@RunWith(SpringRunner.class)
@SpringBootTest(properties = "classpath:application.test.properties")
public class ContextProviderTest {
    private static final String MOCK_CONTEXT_PATH = "/mommoo-portfolio";
    private static final String RELATIVE_ASSETS_PATH = "static" + File.separator + "assets" + File.separator;
    private static final String RELATIVE_IMAGE_PATH = RELATIVE_ASSETS_PATH + "images" + File.separator;

    @Autowired
    public ContextProvider contextProvider;

    @Test
    public void testRootContextPathMatched() {
        String contextPathOfContextData = contextProvider.getContext().getContextPath();
        assertThat(MOCK_CONTEXT_PATH, is( contextPathOfContextData ));
    }

    @Test
    public void testAssetsMatched() {
        Context.Assets assets = contextProvider.getContext().getAssets();

        String relativeAssetsPathOfContext = assets.getRelativePath();
        assertThat(RELATIVE_ASSETS_PATH, is(relativeAssetsPathOfContext));

        assertTrue(assets.getAbsolutePath().contains(RELATIVE_ASSETS_PATH));

        String relativeImageDirectoryPathOfContext = assets.getRelativeImageDirectoryPath();
        assertThat(RELATIVE_IMAGE_PATH, is(relativeImageDirectoryPathOfContext));

        assertTrue(assets.getAbsoluteImageDirectoryPath().contains(RELATIVE_IMAGE_PATH));
    }
}
