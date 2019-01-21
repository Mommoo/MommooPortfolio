package com.mommoo.portfolio;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

/**
 * @author mommoo
 */
@Configuration
public class MommooWebMvcConfigurer implements WebMvcConfigurer {

    /**
     * In development environment for convenience of using API, open to all origins
     */
    @Profile("dev")
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*");
    }

    /*
     * For angular routing api,
     * except that controller url matching and real resource path,
     * any url pass to angular app.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver(){
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestResource = location.createRelative(resourcePath);
                        boolean isExistAnyURLMapped = requestResource.exists() && requestResource.isReadable();
                        return isExistAnyURLMapped ? requestResource : new ClassPathResource("/static/index.html");
                    }
                });
    }
}
