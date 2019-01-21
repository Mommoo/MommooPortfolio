package com.mommoo.portfolio.mongo.repository;

import com.mommoo.portfolio.domain.project.NormalProject;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author mommoo
 */
public interface NormalProjectMongoRepository extends MongoRepository<NormalProject, String> {
    public NormalProject findByTitle(String title);
}
