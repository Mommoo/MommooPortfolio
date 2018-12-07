package com.mommoo.portfolio.mongo.repository;

import com.mommoo.portfolio.domain.project.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author mommoo
 */
public interface ProjectMongoRepository extends MongoRepository<Project, String> {
}