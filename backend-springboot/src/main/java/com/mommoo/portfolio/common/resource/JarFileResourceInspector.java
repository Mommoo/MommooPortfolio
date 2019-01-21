package com.mommoo.portfolio.common.resource;

import java.io.File;
import java.net.URI;
import java.net.URL;
import java.nio.file.*;
import java.util.Collections;

/**
 * This class implements ResourceInspector's way of finding resource where jar module.
 *
 * @author mommoo
 */
class JarFileResourceInspector extends ResourceInspector {
    private FileSystem JARFileSystem;
    private String classPath;

    JarFileResourceInspector() {
        try {
            URL protectionURL = JarFileResourceInspector.class.getProtectionDomain().getCodeSource().getLocation();
            String jarFileClassPath = protectionURL.getPath();
            // get jar file location path;
            String currentJarFileLocationPath = new File("").toURI().getPath();
            // get relative class-path [ project.jar/xxx/xx/ ]
            String relativeJarFileClassPath = jarFileClassPath
                    .substring(jarFileClassPath.indexOf(currentJarFileLocationPath) + currentJarFileLocationPath.length())
                    // clear Jar file's separator
                    .replaceAll("!", "");

            String[] paths = relativeJarFileClassPath.split("/");
            String projectJarFileName = paths[0];
            this.classPath = relativeJarFileClassPath
                    .substring(relativeJarFileClassPath.indexOf(projectJarFileName) + projectJarFileName.length());

            URI jarFileSystemsURI = URI.create("jar:file:" + currentJarFileLocationPath + projectJarFileName);

            this.JARFileSystem = FileSystems.newFileSystem(jarFileSystemsURI, Collections.emptyMap());
        } catch(Exception e) {
            e.printStackTrace();
            try {
                throw new Exception("could not found domain uri location...");
            } catch (Exception e1) {
                e1.printStackTrace();
            }
        }
    }

    @Override
    String findResourceRelativePath(String startRelativePath, String resourceName) {
        Path jarResourcePath = getJarResourcePath(startRelativePath);
        Path foundResourceAbsolutePath = findResourceAbsolutePath(jarResourcePath, resourceName);

        if (foundResourceAbsolutePath == null) {
            return "";
        }

        // convert relative path
        if (foundResourceAbsolutePath.startsWith(classPath)) {
            return foundResourceAbsolutePath
                    .toAbsolutePath()
                    .toString()
                    .substring(classPath.length());
        }

        return "";
    }
    
    private Path getJarResourcePath(String resourceDirectoryPath) {
        if (JARFileSystem == null) {
            return null;
        }
        return this.JARFileSystem.getPath(classPath + resourceDirectoryPath);
    }
}
