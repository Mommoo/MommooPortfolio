package com.mommoo.controller;

import com.mommoo.repository.ProjectMongoDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author mommoo
 */
@RestController
public class DataController {
    private ProjectMongoDBRepository projectMongoDBRepository;

    private DataController(@Autowired ProjectMongoDBRepository projectMongoDBRepository) {
        this.projectMongoDBRepository = projectMongoDBRepository;
    }

    @RequestMapping("/projects")
    private Object projects() {
        return projectMongoDBRepository.findAll();
    }
}
