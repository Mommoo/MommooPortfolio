package com.mommoo.portfolio;

import com.mommoo.portfolio.mongo.repository.BasicProjectMongoRepository;
import com.mommoo.portfolio.mongo.repository.IntroductionMongoRepository;
import com.mommoo.portfolio.mongo.repository.NormalProjectMongoRepository;
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
    private NormalProjectMongoRepository normalProjectMongoRepository;

    @Autowired
    private BasicProjectMongoRepository basicProjectMongoRepository;

    @Autowired
    private IntroductionMongoRepository introductionMongoRepository;

    @Test
    public void printProjectData() {
        System.out.println(normalProjectMongoRepository.findAll());
    }

    @Test
    public void printSimpleProjectData() {
        System.out.println(basicProjectMongoRepository.findAll());
    }

    @Test
    public void printIntroductionData() {
        System.out.println(introductionMongoRepository.findFirstBy());
    }
}
