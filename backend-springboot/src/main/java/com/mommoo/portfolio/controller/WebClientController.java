package com.mommoo.portfolio.controller;

import com.mommoo.portfolio.domain.webclient.WebClientFactory;
import com.mommoo.portfolio.domain.webclient.WebClientResource;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @RequestMapping(value = "/project/basic/all", method=RequestMethod.GET)
    private Object getWebClientBasicProjectList(HttpServletRequest httpServletRequest) {
        return webClientFactory.createWebClientBasicProjectList(computeDomainPath(httpServletRequest));
    }

    @RequestMapping(value = "/project/normal/{title}", method = RequestMethod.GET)
    private Object getWebClientNormalProject(@PathVariable String title, HttpServletRequest httpServletRequest) {
        return webClientFactory.createWebClientNormalProjectByTitle(title, computeDomainPath(httpServletRequest));
    }

    @RequestMapping(value = "/introduction")
    private Object getWebClientProfile(HttpServletRequest httpServletRequest) {
        return webClientFactory.createWebClientIntroduction(computeDomainPath(httpServletRequest));
    }

    @RequestMapping(value = "/image", method = RequestMethod.POST)
    private Object findWebClientImagePath(HttpServletRequest httpServletRequest, @RequestBody List<String> imageNameList) {
        WebClientResource webClientResource = webClientFactory.createWebClientResource(computeDomainPath(httpServletRequest));

        return imageNameList
                .stream()
                .collect(Collectors.toMap(name -> name, webClientResource::findImageResourcePath));
    }

    private static String computeDomainPath(HttpServletRequest httpServletRequest) {
        String protocol = httpServletRequest.getScheme();
        String host = httpServletRequest.getServerName();
        String port = Integer.toString(httpServletRequest.getServerPort());
        String contextPath = httpServletRequest.getContextPath();

        return protocol+"://"+host+":" + port + contextPath;
    }
}
