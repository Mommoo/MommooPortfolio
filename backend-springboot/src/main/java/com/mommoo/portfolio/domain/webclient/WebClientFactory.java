package com.mommoo.portfolio.domain.webclient;

import com.mommoo.portfolio.common.resource.ResourceFinder;
import com.mommoo.portfolio.domain.introduction.Introduction;
import com.mommoo.portfolio.domain.project.BasicProject;
import com.mommoo.portfolio.domain.project.NormalProject;
import com.mommoo.portfolio.mongo.repository.BasicProjectMongoRepository;
import com.mommoo.portfolio.mongo.repository.IntroductionMongoRepository;
import com.mommoo.portfolio.mongo.repository.NormalProjectMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * This class creates web client's data that be created by both Entity and {@link WebClientResource}
 *
 * In case WebClientProject Data {@link WebClientBasicProject}{@link WebClientNormalProject},
 * the resource directory name needed to {@link WebClientResource},
 * will be as project's title{@link BasicProject#getTitle}.
 *
 * @author mommoo
 */
@Service
public class WebClientFactory {
    private ResourceFinder resourceFinder;
    private BasicProjectMongoRepository basicProjectMongoRepository;
    private NormalProjectMongoRepository normalProjectMongoRepository;
    private IntroductionMongoRepository introductionMongoRepository;

    private WebClientFactory(ResourceFinder resourceFinder,
                             BasicProjectMongoRepository basicProjectMongoRepository,
                             NormalProjectMongoRepository normalProjectMongoRepository,
                             IntroductionMongoRepository introductionMongoRepository) {

        this.resourceFinder = resourceFinder;
        this.basicProjectMongoRepository = basicProjectMongoRepository;
        this.normalProjectMongoRepository = normalProjectMongoRepository;
        this.introductionMongoRepository = introductionMongoRepository;
    }

    @Transactional(readOnly = true)
    public List<WebClientBasicProject> createWebClientBasicProjectList(String domainPath) {
        return basicProjectMongoRepository
                .findAll()
                .stream()
                .map(project-> {
                    WebClientResource resource = new WebClientResource(resourceFinder, domainPath, project.getTitle());
                    return new WebClientBasicProject(project, resource);
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WebClientNormalProject createWebClientNormalProjectByTitle(String title, String domainPath) {
        NormalProject foundProject = normalProjectMongoRepository.findByTitle(title);
        WebClientResource webClientResource = new WebClientResource(resourceFinder, domainPath, foundProject.getTitle());
        return new WebClientNormalProject(foundProject, webClientResource);
    }

    @Transactional(readOnly = true)
    public WebClientIntroduction createWebClientIntroduction(String domainPath) {
        Introduction introduction = introductionMongoRepository.findFirstBy();
        WebClientResource webClientResource = createWebClientResource(domainPath);
        return new WebClientIntroduction(introduction, webClientResource);
    }

    public WebClientResource createWebClientResource(String domainPath) {
        return new WebClientResource(resourceFinder, domainPath);
    }
}
