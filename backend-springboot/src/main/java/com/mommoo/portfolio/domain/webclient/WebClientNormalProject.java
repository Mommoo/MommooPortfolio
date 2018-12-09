package com.mommoo.portfolio.domain.webclient;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.mommoo.portfolio.domain.project.NormalProject;
import com.mommoo.portfolio.domain.project.NormalProject.Example;
import lombok.ToString;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private final String bannerImage;
    private final List<String> plannings;
    private final List<String> results;
    private final WebClientExample example;
    private final List<NormalProject.Feature> features;

    WebClientNormalProject(NormalProject project, WebClientResource webClientResource) {
        super(project, webClientResource);
        this.bannerImage = webClientResource.findImageFile(project.getBannerImage());
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
                .image(this.webClientResource.findImageFile(feature.getImage()))
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
        private final Map<String, String> github;
        private final Map<String, String> youtube;
        private final Map<String, String> googleApp;
        private final Map<String, String> sample;
        private final Map<String, String> blog;

        private WebClientExample(Example example) {
            this.github = createImageItem("github", "url", example.getGithubURL());
            this.youtube = createImageItem("youtube", "token", example.getYoutubeToken());
            this.googleApp = createImageItem("google_play", "packageName", example.getGoogleAppPackageName());
            this.sample = createImageItem("program", "url", example.getSampleURL());
            this.blog = createImageItem("blog", "url", example.getBlogURL());
        }

        private Map<String, String> createImageItem(String imageName, String key, String value) {
            Map<String, String> imageItem = new HashMap<>();
            String imageFile = webClientResource.findImageFile(imageName);
            imageItem.put("image", imageFile);
            imageItem.put(key, value);
            return imageItem;
        }
    }
}
