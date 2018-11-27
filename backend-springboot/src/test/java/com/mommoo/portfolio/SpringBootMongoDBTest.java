package com.mommoo.portfolio;

import com.mommoo.portfolio.project.repository.ProjectRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author mommoo
 */
@RunWith(SpringRunner.class)
@SpringBootTest()
public class SpringBootMongoDBTest {

    @Autowired
    private ProjectRepository repository;

    @Test
    public void printProjectData() {
        System.out.println(repository.findAll());
    }
}
