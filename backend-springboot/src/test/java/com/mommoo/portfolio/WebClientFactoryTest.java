package com.mommoo.portfolio;

import com.mommoo.portfolio.domain.webclient.WebClientFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author mommoo
 */
@RunWith(SpringRunner.class)
@SpringBootTest(properties = "classpath:application.test.properties")
public class WebClientFactoryTest {
    @Autowired
    private WebClientFactory webClientFactory;

    @Test
    public void printWebClientNormalProject() {
        System.out.println(webClientFactory.createWebClientNormalProjectByTitle("과기Day", ""));
    }

    @Test
    public void printSimpleProjectWithResource() {
        webClientFactory
                .createWebClientBasicProjectList("")
                .stream()
                .limit(1)
                .forEach(System.out::println);
    }

    @Test
    public void printWebClientIntroduction() {
//        System.out.println(webClientFactory.createWebClientIntroduction(""));
    }

}
