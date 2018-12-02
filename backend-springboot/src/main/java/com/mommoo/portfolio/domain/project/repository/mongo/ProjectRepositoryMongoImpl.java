package com.mommoo.portfolio.domain.project.repository.mongo;

import com.mommoo.portfolio.domain.project.Project;
import com.mommoo.portfolio.domain.project.SimpleProject;
import com.mommoo.portfolio.domain.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author mommoo
 */
@Repository()
class ProjectRepositoryMongoImpl implements ProjectRepository {
    private ProjectMongoRepository projectMongoRepository;
    private SimpleProjectMongoRepository simpleProjectMongoRepository;

    @Autowired
    public ProjectRepositoryMongoImpl(ProjectMongoRepository projectMongoRepository, SimpleProjectMongoRepository simpleProjectMongoRepository) {
        this.projectMongoRepository = projectMongoRepository;
        this.simpleProjectMongoRepository = simpleProjectMongoRepository;
    }

    @Override
    public List<Project> getProjects() {
        return this.projectMongoRepository.findAll();
    }

    @Override
    public List<SimpleProject> getSimpleProjects() {
        return this.simpleProjectMongoRepository.findAll();
    }
}
