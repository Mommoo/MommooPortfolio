package com.mommoo.portfolio.project.repository;

import com.mommoo.portfolio.project.data.db.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * MongoDB 데이터 베이스와 연동되어 작동되는 MongoRepository API를 사용하기 위해 작성한 클래스입니다.
 * MongoRepository의 Generic 값으로 Project{@link Project}를 설정함으로서, MongoDB의 Project Document가 매핑 됩니다.
 *
 * @author mommoo
 */
public interface ProjectMongoDBRepository extends MongoRepository<Project, String> {

}
