package com.mommoo.portfolio.controller;

import com.mommoo.portfolio.domain.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * this class provides processed data as REST API
 *
 * @since 2018 11 17
 * current database system is mongoDB
 *
 * @author mommoo
 */
@RestController
@RequestMapping("/data")
public class RestDataController {
    private ProjectRepository projectRepository;

    private RestDataController(@Autowired ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @RequestMapping(value = "/projects", method = RequestMethod.GET)
    private Object projects() {
        return projectRepository.getProjects();
    }
}
