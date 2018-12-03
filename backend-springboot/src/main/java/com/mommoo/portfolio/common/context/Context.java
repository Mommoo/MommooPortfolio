package com.mommoo.portfolio.common.context;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * It is the context data that decide by developer for project's properties
 *
 * If illogical static data exist,
 * it have to declare to this application.properties file {@see classpath::resouces.application.properties}
 * and this class provide it if you want
 *
 * This data will be provided to front-end, by controller {@link com.mommoo.portfolio.controller.RestDataController}
 *
 * @author mommoo
 */
@Builder
@Getter
@ToString
public class Context {
    private final String contextPath;
    private final String themeColor;
}
