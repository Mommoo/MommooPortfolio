package com.mommoo.portfolio.mongo.repository;

import com.mommoo.portfolio.domain.resource.Resource;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author mommoo
 */
public interface ResourceMongoRepository extends MongoRepository<Resource, String> {
    Resource findFirstBy();
}
