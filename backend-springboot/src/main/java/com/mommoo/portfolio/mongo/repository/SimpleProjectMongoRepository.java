package com.mommoo.portfolio.mongo.repository;

import com.mommoo.portfolio.domain.project.SimpleProject;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author mommoo
 */
public interface SimpleProjectMongoRepository extends MongoRepository<SimpleProject, String> {
}
