package com.mommoo.portfolio.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
 * It is provide of the 'mommoo-portfolio' project's context data
 * Context data is to static data that decide by developer for 'mommoo-portfolio' project's properties
 * If illogical static data exist, it have to declare to this class and provide if you want
 *
 * @author mommoo
 */
@Component
public class ContextProvider {
    private static final String IMAGE_REPOSITORY_PATH = "/assets";
    private final String CONTEXT_PATH;

    @Autowired
    public ContextProvider(Environment environment) {
        this.CONTEXT_PATH = environment.getProperty("server.servlet.context-path");
    }

    public String getContextPath() {
        return CONTEXT_PATH;
    }

    public String getImageRepositoryPath() {
        return IMAGE_REPOSITORY_PATH;
    }
}
