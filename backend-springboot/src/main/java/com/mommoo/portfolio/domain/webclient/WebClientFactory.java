package com.mommoo.portfolio.domain.webclient;

import com.mommoo.portfolio.common.context.Context;
import com.mommoo.portfolio.common.context.ContextProvider;
import com.mommoo.portfolio.domain.project.BasicProject;
import com.mommoo.portfolio.domain.project.NormalProject;
import com.mommoo.portfolio.mongo.repository.BasicProjectMongoRepository;
import com.mommoo.portfolio.mongo.repository.NormalProjectMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * This class creates and provides web client's data.
 * Specific project resource directory's name is {@link BasicProject#getName()}
 * {@link #createWebClientResource(Context, BasicProject)}
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
                .map(project-> new WebClientBasicProject(project, createWebClientResource(context, project)))
                .collect(Collectors.toList());
    }

    public WebClientNormalProject createWebClientNormalProjectBySerialNumber(int serialNumber) {
        Context context = this.contextProvider.getContext();
        NormalProject foundProject = normalProjectMongoRepository.findBySerialNumber(serialNumber);
        return new WebClientNormalProject(foundProject, createWebClientResource(context, foundProject));
    }

    /** specific project directory name will be used as project's name */
    private static WebClientResource createWebClientResource(Context context, BasicProject basicProject) {
        String projectResourceDirectoryName = basicProject.getName();

        return WebClientResource
                .builder()
                .context(context)
                .imageDirectoryNames(projectResourceDirectoryName)
                .build();
    }
}
