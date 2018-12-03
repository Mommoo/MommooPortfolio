package com.mommoo.portfolio.domain.project;

import com.mommoo.portfolio.domain.project.Project;
import com.mommoo.portfolio.domain.resource.Resource;
import com.mommoo.portfolio.mongo.repository.ProjectMongoRepository;
import com.mommoo.portfolio.mongo.repository.ResourceMongoRepository;
import com.mommoo.portfolio.mongo.repository.SimpleProjectMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * this class performs project's domain logic
 *
 * @author mommoo
 */
@Service
public class ProjectService {
    private ResourceMongoRepository resourceMongoRepository;
    private SimpleProjectMongoRepository simpleProjectMongoRepository;
    private ProjectMongoRepository projectMongoRepository;

    @Autowired
    private ProjectService(ResourceMongoRepository resourceMongoRepository,
                          SimpleProjectMongoRepository simpleProjectMongoRepository,
                          ProjectMongoRepository projectMongoRepository){

        this.resourceMongoRepository = resourceMongoRepository;
        this.simpleProjectMongoRepository = simpleProjectMongoRepository;
        this.projectMongoRepository = projectMongoRepository;
    }

    public List<SimpleProject> getSimpleProjectsCombinedResource() {
        Resource resource = resourceMongoRepository.findFirstBy();
        return simpleProjectMongoRepository
                .findAll()
                .stream()
                .map(project -> project.createCombinedWithResource(resource))
                .collect(Collectors.toList());
    }

    public List<Project> getProjectsCombinedResource() {
        Resource resource = resourceMongoRepository.findFirstBy();
        return projectMongoRepository
                .findAll()
                .stream()
                .map(project -> project.createCombinedWithResource(resource))
                .collect(Collectors.toList());
    }
}
