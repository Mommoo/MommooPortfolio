package com.mommoo.portfolio.domain.project.repository.mongo;

import com.mommoo.portfolio.domain.project.data.db.SimpleProject;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author mommoo
 */
public interface SimpleProjectMongoRepository extends MongoRepository<SimpleProject, String> {
}
