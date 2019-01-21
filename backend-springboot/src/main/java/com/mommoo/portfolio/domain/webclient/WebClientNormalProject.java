package com.mommoo.portfolio.domain.webclient;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.mommoo.portfolio.domain.project.NormalProject;
import com.mommoo.portfolio.domain.project.NormalProject.Example;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

/**
 * This class provides data that is exposed to web client.
 * The data type is similar to {@link NormalProject} Entity.
 * But to enable web client to using it,
 * several data need to be restructured with the help of {@link WebClientResource}.
 *
 * @author mommoo
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@ToString(callSuper = true)
public class WebClientNormalProject extends WebClientBasicProject {
    private final String UIImage;
    private final List<String> programType;
    private final String subTitle;
    private final List<String> plannings;
    private final List<String> results;
    private final WebClientExample example;
    private final List<NormalProject.Feature> features;

    WebClientNormalProject(NormalProject project, WebClientResource webClientResource) {
        super(project, webClientResource);
        this.UIImage = webClientResource.findImageResourcePath(project.getUIImage());
        this.programType = project.getProgramType();
        this.subTitle = project.getSubTitle();
        this.plannings = project.getPlannings();
        this.results = project.getResults();
        this.example = new WebClientExample(project.getExample());
        this.features = createWebClientFeatureList(project.getFeatures());
    }

    private List<NormalProject.Feature> createWebClientFeatureList(List<NormalProject.Feature> featureList) {
        return featureList
                .stream()
                .map(this::createWebClientFeature)
                .collect(Collectors.toList());
    }

    private NormalProject.Feature createWebClientFeature(NormalProject.Feature feature) {
        return NormalProject.Feature
                .builder()
                .title(feature.getTitle())
                .image(webClientResource.findImageResourcePath(feature.getImage()))
                .explanations(feature.getExplanations())
                .build();
    }

    /**
     * Web client want to icon file to express example's item
     * but {@link Example} Entity is not have icon file path so,
     * this class provides wrapper data that have both the {@link Example} Entity data and a icon file path
     */
    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    @ToString
    private class WebClientExample {
        private final WebClientURLExample github;
        private final WebClientYoutubeExample youtube;
        private final WebClientURLExample googleApp;
        private final WebClientURLExample sample;
        private final WebClientURLExample blog;

        private WebClientExample(Example example) {
            this.github = new WebClientURLExample("github", example.getGithubURL());
            this.youtube = new WebClientYoutubeExample("youtube", example.getYoutubeToken());
            this.googleApp = new WebClientURLExample("google_play", convertToGoogleAppDownloadURL(example.getGoogleAppPackageName()));
            this.sample = new WebClientURLExample("program", example.getSampleURL());
            this.blog = new WebClientURLExample("blog", example.getBlogURL());
        }

        private boolean isStringEmpty(String string) {
            return string == null || string.equals("");
        }

        private String convertToGoogleAppDownloadURL(String packageName) {
            if ( isStringEmpty(packageName) ) {
                return "";
            }
            return "https://play.google.com/store/apps/details?id="+packageName;
        }

        @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
        @ToString(callSuper = true)
        private class WebClientURLExample {
            private final String image;
            private final String url;

            private WebClientURLExample(String imageName, String URL) {
                if ( isStringEmpty(URL) ){
                    this.image = this.url = "";
                    return;
                }

                this.image = webClientResource.findImageResourcePath(imageName);
                this.url = URL;
            }
        }

        @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
        @ToString(callSuper = true)
        private class WebClientYoutubeExample  {
            private final String image;
            private final String token;

            private WebClientYoutubeExample(String imageName, String token) {
                if ( isStringEmpty(token) ) {
                    this.image = this.token = "";
                    return;
                }
                this.image = webClientResource.findImageResourcePath(imageName);
                this.token = token;
            }
        }
    }
}
