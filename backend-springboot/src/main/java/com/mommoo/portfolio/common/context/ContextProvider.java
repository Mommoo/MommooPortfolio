package com.mommoo.portfolio.common.context;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
 * this class provides context data created by {@link Environment}
 * @see Context
 *
 * @author mommoo
 */
@Component
public class ContextProvider {
    private static final String CONTEXT_PATH_PROPERTY_KEY = "server.servlet.context-path";
    private static final String THEME_COLOR_PROPERTY_KEY = "theme.color";
    private Environment environment;

    @Autowired
    public ContextProvider(Environment environment) {
        this.environment = environment;
    }

    public Context getContext() {
        return Context.builder()
                .contextPath(this.environment.getProperty(CONTEXT_PATH_PROPERTY_KEY))
                .themeColor(this.environment.getProperty(THEME_COLOR_PROPERTY_KEY))
                .build();
    }
}
