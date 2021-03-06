package com.mommoo.portfolio;

import com.mommoo.portfolio.common.resource.ResourceDomainArgumentResolver;
import com.mommoo.portfolio.common.context.ContextEnvironment;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;
import java.util.List;

/**
 * @author mommoo
 */
@Configuration
public class MommooWebMvcConfigurer implements WebMvcConfigurer {
    private ContextEnvironment contextEnvironment;

    public MommooWebMvcConfigurer(ContextEnvironment contextEnvironment) {
        this.contextEnvironment = contextEnvironment;
    }

    /** In development environment for convenience of using API, open to all origins */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        if ( contextEnvironment.isDevProfile ) {
            registry.addMapping("/**")
                    .allowedOrigins("*");
        }
    }

    /*
     * For angular routing api,
     * except that controller url matching and real resource path,
     * any url pass to angular app.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations(contextEnvironment.resourceLocationPath+"/")
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

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new ResourceDomainArgumentResolver(contextEnvironment));
    }
}
