package com.mommoo.portfolio.domain.webclient;

import com.mommoo.portfolio.common.resource.ResourceLocation;
import org.apache.logging.log4j.util.Strings;

/**
 *
 * @author mommoo
 */

class WebImageResourceBuilder {
    private final ResourceLocation resourceLocation;
    private final String domainPath;

    WebImageResourceBuilder(ResourceLocation resourceLocation, String domainPath) {
        this.resourceLocation = resourceLocation;
        this.domainPath = domainPath;
    }

    String buildWebImagePath(String relativePath) {
        if (Strings.isEmpty(relativePath)) {
            return "";
        }
        return domainPath+ "/" + this.resourceLocation.getImageResourcePath() + "/" + relativePath;
    }
}
