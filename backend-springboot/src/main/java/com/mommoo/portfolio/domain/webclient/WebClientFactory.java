package com.mommoo.portfolio.domain.webclient;

import com.mommoo.portfolio.common.context.ContextEnvironment;
import com.mommoo.portfolio.common.resource.ResourceLocation;
import com.mommoo.portfolio.domain.introduction.Introduction;
import com.mommoo.portfolio.domain.project.NormalProject;
import com.mommoo.portfolio.mongo.repository.BasicProjectMongoRepository;
import com.mommoo.portfolio.mongo.repository.IntroductionMongoRepository;
import com.mommoo.portfolio.mongo.repository.NormalProjectMongoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * This class creates and provides The WebClient data.
 *
 * Also, it is creating the {@link WebImageResourceBuilder} which needed to the WebClient data.
 *
 * @author mommoo
 */
@Service
public class WebClientFactory {
    private ResourceLocation resourceLocation;
    private BasicProjectMongoRepository basicProjectMongoRepository;
    private NormalProjectMongoRepository normalProjectMongoRepository;
    private IntroductionMongoRepository introductionMongoRepository;

    private WebClientFactory(ResourceLocation resourceLocation,
                             BasicProjectMongoRepository basicProjectMongoRepository,
                             NormalProjectMongoRepository normalProjectMongoRepository,
                             IntroductionMongoRepository introductionMongoRepository) {

        this.resourceLocation = resourceLocation;
        this.basicProjectMongoRepository = basicProjectMongoRepository;
        this.normalProjectMongoRepository = normalProjectMongoRepository;
        this.introductionMongoRepository = introductionMongoRepository;
    }

    private WebImageResourceBuilder createWebResourceBuilder(String domainPath) {
        return new WebImageResourceBuilder(resourceLocation, domainPath);
    }

    @Transactional(readOnly = true)
    public List<WebClientBasicProject> createWebClientBasicProjectList(String domainPath) {
        return basicProjectMongoRepository
                .findAll()
                .stream()
                .map(project-> new WebClientBasicProject(project, createWebResourceBuilder(domainPath)))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WebClientNormalProject createWebClientNormalProjectByTitle(String title, String domainPath) {
        NormalProject foundProject = normalProjectMongoRepository.findByTitle(title);
        return new WebClientNormalProject(foundProject, createWebResourceBuilder(domainPath));
    }

    @Transactional(readOnly = true)
    public WebClientIntroduction createWebClientIntroduction(String domainPath) {
        Introduction introduction = introductionMongoRepository.findFirstBy();
        return new WebClientIntroduction(introduction, createWebResourceBuilder(domainPath));
    }
}
