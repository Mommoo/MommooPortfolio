package com.mommoo.portfolio.domain.webresource;

import com.mommoo.portfolio.common.resource.ResourceLocation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * This class provides resource service user want.
 *
 * The resource path is managed by {@link ResourceLocation}, and then
 * by using it, this class create the map object that consisted result
 * of requesting which want to find resource file path by name.
 *
 * @author mommoo
 */
@Service
public class WebResourceService {
    private WebResourceFinder webResourceFinder;
    private ResourceLocation resourceLocation;

    public WebResourceService(WebResourceFinder webResourceFinder, ResourceLocation resourceLocation) {
        this.webResourceFinder = webResourceFinder;
        this.resourceLocation = resourceLocation;
    }

    public WebResourcePath resolveWebResourcePath(String resourceDomain) {
        return new WebResourcePath() {
            @Override
            public String getImageResourcePath() {
                return resourceDomain + "/" + resourceLocation.getImageResourcePath();
            }

            @Override
            public String getFileResourcePath() {
                return resourceDomain + "/" + resourceLocation.getFileResourcePath();
            }
        };
    }

    public Map<String, String> resolvePaperFiles(String resourceDomain) {
        Function<String, String> parseFileName = sPath -> {
            int beginIndex = sPath.lastIndexOf("/") + 1;
            int endIndex = sPath.lastIndexOf(".");
            return sPath.substring(beginIndex, endIndex);
        };

        String paperResourcePath = resourceLocation.getPaperFileLocationPath();

        return webResourceFinder
                .findAllResourceWebPathsInDirectory(paperResourcePath)
                .stream()
                .collect(Collectors.toMap(parseFileName, sPath -> resourceDomain + sPath));
    }
}
