package com.mommoo.portfolio.domain.webresource;

import com.mommoo.portfolio.common.context.ContextEnvironment;
import com.mommoo.portfolio.common.resource.ResourceFinder;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.regex.Matcher;
import java.util.stream.Collectors;

/**
 * This class is the decorate class of {@link ResourceFinder}.
 * This class find resource path through {@link ResourceFinder}
 * and convert it to web path.
 *
 * @author mommoo
 */
@Service
public class WebResourceFinder {
    private ContextEnvironment contextEnvironment;
    private ResourceFinder resourceFinder;

    public WebResourceFinder(ContextEnvironment contextEnvironment, ResourceFinder resourceFinder) {
        this.contextEnvironment = contextEnvironment;
        this.resourceFinder = resourceFinder;
    }

    private String changeToWebPath(String sPath) {
        /* The web path have to consist of '/' file separator */
        String OSFileSeparator = File.separator;
        if ( sPath.contains(OSFileSeparator) ) {
            sPath = sPath.replaceAll(Matcher.quoteReplacement(OSFileSeparator), "/");
        }

        String rootResourceLocationName = contextEnvironment.resourceLocationName;
        if ( Strings.isEmpty(sPath) || !sPath.contains(rootResourceLocationName) ) {
            return "";
        }

        /* The web path have to converted to relative path
        by removing resource's start location path */
        int startIndex
                = sPath.indexOf(rootResourceLocationName) + rootResourceLocationName.length();

        return sPath.substring(startIndex);
    }

    public List<String> findAllResourceWebPathsInDirectory(String resourcePath) {
        /* when using file system api, the path have to be relative path of class-path */
        resourcePath = contextEnvironment.resourceLocationName + "/" + resourcePath;
        return this.resourceFinder.findResourcesInDirectory(resourcePath)
                .stream()
                .map(this::changeToWebPath)
                .collect(Collectors.toList());
    }
}
