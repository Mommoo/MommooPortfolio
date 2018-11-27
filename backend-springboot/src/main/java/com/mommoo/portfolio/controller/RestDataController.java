package com.mommoo.portfolio.controller;

import com.mommoo.portfolio.project.repository.ProjectMongoDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * this class provides processed data as REST API
 * processed data is declared at 'data' package
 * @see com.mommoo.portfolio.data
 *
 * @since 2018 11 17
 * current database system is mongoDB
 *
 * @author mommoo
 */
@RestController
@RequestMapping("/data")
public class RestDataController {
    private ProjectMongoDBRepository projectMongoDBRepository;

    private RestDataController(@Autowired ProjectMongoDBRepository projectMongoDBRepository) {
        this.projectMongoDBRepository = projectMongoDBRepository;
    }

    @RequestMapping(name = "/projects", method = RequestMethod.GET)
    private Object projects() {
        return projectMongoDBRepository.findAll();
    }
}
