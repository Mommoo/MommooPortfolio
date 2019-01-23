package com.mommoo.portfolio;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.ResourceUtils;

import java.io.FileNotFoundException;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = "classpath:application.test.properties")
public class BackendSpringbootApplicationTests {
    @Autowired
    Environment environment;

    @Test
    public void contextLoads() {
        try {
            System.out.println(environment.getProperty("spring.resources.static-locations"));
            System.out.println(ResourceUtils.getFile("classpath:static"));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

}
