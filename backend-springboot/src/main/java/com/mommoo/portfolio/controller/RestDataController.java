package com.mommoo.portfolio.controller;

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
//    private ProjectRepository projectRepository;
//
//    private RestDataController(@Autowired ProjectRepository projectRepository) {
//        this.projectRepository = projectRepository;
//    }
//
//    @RequestMapping(value = "/projects", method = RequestMethod.GET)
//    private Object projects() {
//        return projectRepository.getProjects();
//    }
//
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    private Object test() {
        return new Test() {
            @Override
            public String getName() {
                return "Mommoo";
            }
        };
    }

    public interface Test {
        String getName();
    }
}
