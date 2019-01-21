package com.mommoo.portfolio.common;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

/**
 * This resolver is computing domain path.
 *
 * @author mommoo
 */
public class DomainPathControllerArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(DomainPath.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest httpServletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        return computeDomainPath(httpServletRequest);
    }

    private static String computeDomainPath(HttpServletRequest httpServletRequest) {
        String protocol = httpServletRequest.getScheme();
        String host = httpServletRequest.getServerName();
        String port = Integer.toString(httpServletRequest.getServerPort());
        String contextPath = httpServletRequest.getContextPath();

        return protocol+"://"+host+":" + port + contextPath;
    }
}
