package com.mommoo.portfolio.common.context;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * This class provides context data of project.
 * The data created by reading properties file through Environment {@link Environment}.
 *
 * So, this class have to need two properties file default and development.
 * The default properties is basic files ( application.properties ) and,
 * the development properties have to named to "application-{$name}.properties".
 * {@link #devProfileName}
 *
 * @author mommoo
 */
@Component
public class ContextEnvironment {
    private static final String devProfileName = "dev";
    private static final String contextPathKey = "server.servlet.context-path";
    private static final String resourceLocationKey = "spring.resources.static-locations";
    private static final String getAssetsDirectoryNameKey = "resource.assets-directory-name";
    private static final String getImageDirectoryNameKey = "resource.assets.image-directory-name";
    private static final String domainPathKey = "domain.path";
    private Environment environment;

    public ContextEnvironment(Environment environment) {
        this.environment = environment;
    }

    public String getResourceLocationName() {
        return environment
                .getProperty(resourceLocationKey)
                .substring("classpath:/".length());
    }

    public String getImageRepositoryPath() {
        return getResourceLocationName() + "/" +
                environment.getProperty(getAssetsDirectoryNameKey) + "/" +
                environment.getProperty(getImageDirectoryNameKey);
    }

    public String getProductionDomainPath() {
        return environment.getProperty(domainPathKey) + environment.getProperty(contextPathKey);
    }

    public boolean isDevProfile() {
        String[] profiles = environment.getActiveProfiles();
        return Arrays.asList(profiles).contains(devProfileName);
    }
}
