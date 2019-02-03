package com.mommoo.portfolio.common.context;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;

/**
 * This class provides context data of project.
 * The data loaded by reading properties file.
 *
 * The project environment have consisted of two parts.
 * one is default, another is development.
 *
 * The default properties is basic files ( application.properties ) and,
 * the development properties have to named to "application-{$name}.properties".
 * {@link #devProfileName}
 *
 * @author mommoo
 */
@Component
public class ContextEnvironment {
    private static final String devProfileName = "dev";

    @Value("${server.servlet.context-path}")
    public String contextPath;

    @Value("${spring.resources.static-locations}")
    public String resourceLocationPath;

    @Value("${resource.domain.path}")
    public String resourceDomain;

    public String resourceLocationName;

    public boolean isDevProfile;

    private Environment environment;

    public ContextEnvironment(Environment environment) {
        this.environment = environment;
    }

    @PostConstruct
    private void postConstructor() {
        this.resourceLocationName
                = this.resourceLocationPath.substring("classpath:/".length());

        this.isDevProfile = Arrays
                .asList(environment.getActiveProfiles())
                .contains(devProfileName);
    }
}
