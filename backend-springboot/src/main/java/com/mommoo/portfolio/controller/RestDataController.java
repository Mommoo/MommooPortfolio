package com.mommoo.portfolio.controller;

import com.mommoo.portfolio.domain.project.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * this class provides processed data as REST API
 *
 * @author mommoo
 */
@RestController
@RequestMapping("/data")
public class RestDataController {
    private ProjectService projectService;

    @Autowired
    private RestDataController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @RequestMapping(value = "/projects", method = RequestMethod.GET)
    private Object projects() {
        return this.projectService.getProjectsCombinedResource();
    }
}
