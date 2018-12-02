package com.mommoo.portfolio.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
 * It is data class that the 'mommoo-portfolio' project's context data
 *
 * Context data is to static data that decide by developer for 'mommoo-portfolio' project's properties
 *
 * If illogical static data exist,
 * it have to declare to this application.properties file {@see classpath::resouces.application.properties}
 * and this class provide it if you want
 *
 * This data will be provided to front-end, by controller {@link com.mommoo.portfolio.controller.RestDataController}
 *
 * @author mommoo
 */
@Component
public class ContextProvider {
    private static final String CONTEXT_PATH_PROPERTY_KEY = "server.servlet.context-path";
    private static final String IMAGE_REPOSITORY_PROPERTY_KEY = "image.repository.path";
    private static final String THEME_COLOR_PROPERTY_KEY = "theme.color";
    private Environment environment;

    @Autowired
    public ContextProvider(Environment environment) {
        this.environment = environment;
    }

    public String getContextPath() {
        return this.environment.getProperty(CONTEXT_PATH_PROPERTY_KEY);
    }

    public String getImageRepositoryPath() {
        return this.environment.getProperty(IMAGE_REPOSITORY_PROPERTY_KEY);
    }

    public String getThemeColor() {
        return this.environment.getProperty(THEME_COLOR_PROPERTY_KEY);
    }
}
