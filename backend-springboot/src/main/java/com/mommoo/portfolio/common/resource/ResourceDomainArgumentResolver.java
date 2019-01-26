package com.mommoo.portfolio.common.resource;

import com.mommoo.portfolio.common.context.ContextEnvironment;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

/**
 * This resolver is computing resource path.
 *
 * @author mommoo
 */
public class ResourceDomainArgumentResolver implements HandlerMethodArgumentResolver {
    private ContextEnvironment contextEnvironment;

    public ResourceDomainArgumentResolver(ContextEnvironment contextEnvironment) {
        this.contextEnvironment = contextEnvironment;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(ResourceDomain.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        if ( this.contextEnvironment.isDevProfile ) {
            HttpServletRequest httpServletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
            return computeDomainPath(httpServletRequest);
        }

        return this.contextEnvironment.resourceDomain;
    }

    private static String computeDomainPath(HttpServletRequest httpServletRequest) {
        String protocol = httpServletRequest.getScheme();
        String host = httpServletRequest.getServerName();
        String port = Integer.toString(httpServletRequest.getServerPort());
        String contextPath = httpServletRequest.getContextPath();

        return protocol+"://"+host+":" + port + contextPath;
    }
}
