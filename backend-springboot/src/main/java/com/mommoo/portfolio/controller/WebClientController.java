package com.mommoo.portfolio.controller;

import com.mommoo.portfolio.common.ImageDomainPath;
import com.mommoo.portfolio.domain.webclient.WebClientFactory;
import com.mommoo.portfolio.domain.webclient.WebClientResource;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
    private Object getWebClientBasicProjectList(@ImageDomainPath String domainPath) {
        return webClientFactory.createWebClientBasicProjectList(domainPath);
    }

    @GetMapping(value = "/project/normal/{title}")
    private Object getWebClientNormalProject(@PathVariable String title, @ImageDomainPath String domainPath) {
        return webClientFactory.createWebClientNormalProjectByTitle(title, domainPath);
    }

    @GetMapping(value = "/introduction")
    private Object getWebClientProfile(@ImageDomainPath String domainPath) {
        return webClientFactory.createWebClientIntroduction(domainPath);
    }

    @PostMapping(value = "/image")
    private Object findWebClientImagePath(@ImageDomainPath String domainPath, @RequestBody List<String> imageNameList) {
        WebClientResource webClientResource = webClientFactory.createWebClientResource(domainPath);

        return imageNameList
                .stream()
                .collect(Collectors.toMap(name -> name, webClientResource::findImageResourcePath));
    }
}
