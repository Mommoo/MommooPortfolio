package com.mommoo.portfolio.domain.project.webclient;

import com.mommoo.portfolio.common.context.Context;
import com.mommoo.portfolio.common.context.ContextProvider;
import com.mommoo.portfolio.domain.project.NormalProject;
import com.mommoo.portfolio.mongo.repository.BasicProjectMongoRepository;
import com.mommoo.portfolio.mongo.repository.NormalProjectMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * this class creates and provides web client's data
 *
 * @author mommoo
 */
@Service
public class WebClientFactory {
    private ContextProvider contextProvider;
    private BasicProjectMongoRepository basicProjectMongoRepository;
    private NormalProjectMongoRepository normalProjectMongoRepository;

    @Autowired
    private WebClientFactory(ContextProvider contextProvider, BasicProjectMongoRepository basicProjectMongoRepository,
                             NormalProjectMongoRepository normalProjectMongoRepository) {

        this.contextProvider = contextProvider;
        this.basicProjectMongoRepository = basicProjectMongoRepository;
        this.normalProjectMongoRepository = normalProjectMongoRepository;
    }

    public List<WebClientBasicProject> createWebClientBasicProjectList() {
        Context context = this.contextProvider.getContext();

        return basicProjectMongoRepository
                .findAll()
                .stream()
                .map(project-> new WebClientResource(context, project))
                .map(WebClientBasicProject::new)
                .collect(Collectors.toList());
    }

    public WebClientNormalProject createWebClientNormalProjectBySerialNumber(int serialNumber) {
        Context context = this.contextProvider.getContext();
        NormalProject foundProject = normalProjectMongoRepository.findBySerialNumber(serialNumber);
        WebClientResource webClientResource = new WebClientResource(context, foundProject);
        return new WebClientNormalProject(webClientResource);
    }
}
