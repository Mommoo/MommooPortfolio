package com.mommoo.portfolio.controller;

import com.mommoo.portfolio.common.resource.ResourceDomain;
import com.mommoo.portfolio.domain.webresource.WebResourcePath;
import com.mommoo.portfolio.domain.webresource.WebResourceService;
import org.springframework.web.bind.annotation.*;

/**
 * This controller provides the web-path of resource's paths as json object.
 * (key : file name, value : resource web path)
 *
 * The finding resource web path is powered by {@link WebResourceService}.
 *
 * @author mommoo
 */
@RequestMapping("/data/resource")
@RestController
public class ResourceFindController {
    private WebResourceService webResourceService;

    public ResourceFindController(WebResourceService webResourceService) {
        this.webResourceService = webResourceService;
    }


    @GetMapping("/find/path")
    private WebResourcePath findResourcePath(@ResourceDomain String resourceDomain) {
        return this.webResourceService.resolveWebResourcePath(resourceDomain);
    }

    @GetMapping("/find/file/paper/all")
    private Object findAllPaperResourcePath(@ResourceDomain String resourceDomain) {
        return this.webResourceService.resolvePaperFiles(resourceDomain);
    }
}
