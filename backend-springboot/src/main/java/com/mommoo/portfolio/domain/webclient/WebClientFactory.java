package com.mommoo.portfolio.domain.webclient;

import com.mommoo.portfolio.common.context.Context;
import com.mommoo.portfolio.common.context.ContextProvider;
import com.mommoo.portfolio.domain.introduction.Introduction;
import com.mommoo.portfolio.domain.project.BasicProject;
import com.mommoo.portfolio.domain.project.NormalProject;
import com.mommoo.portfolio.mongo.repository.BasicProjectMongoRepository;
import com.mommoo.portfolio.mongo.repository.IntroductionMongoRepository;
import com.mommoo.portfolio.mongo.repository.NormalProjectMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private ContextProvider contextProvider;
    private BasicProjectMongoRepository basicProjectMongoRepository;
    private NormalProjectMongoRepository normalProjectMongoRepository;
    private IntroductionMongoRepository introductionMongoRepository;

    @Autowired
    private WebClientFactory(ContextProvider contextProvider,
                             BasicProjectMongoRepository basicProjectMongoRepository,
                             NormalProjectMongoRepository normalProjectMongoRepository,
                             IntroductionMongoRepository introductionMongoRepository) {

        this.contextProvider = contextProvider;
        this.basicProjectMongoRepository = basicProjectMongoRepository;
        this.normalProjectMongoRepository = normalProjectMongoRepository;
        this.introductionMongoRepository = introductionMongoRepository;
    }

    public List<WebClientBasicProject> createWebClientBasicProjectList(String domainPath) {
        contextProvider.update();
        return basicProjectMongoRepository
                .findAll()
                .stream()
                .map(project-> {
                    WebClientResource resource
                            = createWebClientResourceUsingByCached(domainPath, project.getTitle());
                    return new WebClientBasicProject(project, resource);
                })
                .collect(Collectors.toList());
    }

    public WebClientNormalProject createWebClientNormalProjectBySerialNumber(int serialNumber, String domainPath) {
        contextProvider.update();
        NormalProject foundProject = normalProjectMongoRepository.findBySerialNumber(serialNumber);
        WebClientResource webClientResource = createWebClientResourceUsingByCached(domainPath, foundProject.getTitle());
        return new WebClientNormalProject(foundProject, webClientResource);
    }

    public WebClientIntroduction createWebClientIntroduction(String domainPath) {
        contextProvider.update();
        Introduction introduction = introductionMongoRepository.findFirstBy();
        WebClientResource webClientResource = createWebClientResourceUsingByCached(domainPath);
        return new WebClientIntroduction(introduction, webClientResource);
    }

    public WebClientResource createWebClientResource(Context context, String domainPath, String... additionalDirectoryPath) {
        return WebClientResource.of(context, domainPath, additionalDirectoryPath);
    }

    /** use cached data */
    private WebClientResource createWebClientResourceUsingByCached(String domainPath, String... additionalDirectoryPath) {
        Context context = this.contextProvider.getContext();
        return WebClientResource.ofDefaultCached(context, domainPath, additionalDirectoryPath);
    }
}
