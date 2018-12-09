package com.mommoo.portfolio.mongo.repository;

import com.mommoo.portfolio.domain.project.BasicProject;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author mommoo
 */
public interface BasicProjectMongoRepository extends MongoRepository<BasicProject, String> {
}
