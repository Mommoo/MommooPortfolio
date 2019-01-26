package com.mommoo.portfolio.controller;

import com.mommoo.portfolio.common.resource.ResourceDomain;
import com.mommoo.portfolio.domain.webclient.WebClientFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * this class provides processed data as REST API
 *
 * @author mommoo
 */
@RestController
@RequestMapping("/data/webclient")
public class WebClientController {
    private WebClientFactory webClientFactory;

    private WebClientController(WebClientFactory webClientFactory) {
        this.webClientFactory = webClientFactory;
    }

    @GetMapping(value = "/project/basic/all")
    private Object getWebClientBasicProjectList(@ResourceDomain String domainPath) {
        return webClientFactory.createWebClientBasicProjectList(domainPath);
    }

    @GetMapping(value = "/project/normal/{title}")
    private Object getWebClientNormalProject(@PathVariable String title, @ResourceDomain String domainPath) {
        return webClientFactory.createWebClientNormalProjectByTitle(title, domainPath);
    }

    @GetMapping(value = "/introduction")
    private Object getWebClientProfile(@ResourceDomain String domainPath) {
        return webClientFactory.createWebClientIntroduction(domainPath);
    }
}
