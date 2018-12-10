package com.mommoo.portfolio.mongo.repository;

import com.mommoo.portfolio.domain.introduction.Introduction;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author mommoo
 */
public interface IntroductionMongoRepository extends MongoRepository<Introduction, String> {
    public Introduction findFirstBy();
}
