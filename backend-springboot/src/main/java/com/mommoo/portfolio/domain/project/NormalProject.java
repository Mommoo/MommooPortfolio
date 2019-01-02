package com.mommoo.portfolio.domain.project;


import lombok.*;
import org.springframework.data.annotation.PersistenceConstructor;

import java.util.List;

/**
 * NormalProject is persistence DTO class that implement the specification of 'project' database data
 * <p>
 * {@link BasicProject}: the basic project data properties.
 * {@link #UIImage}: the project image file path of program ui image
 * {@link #programType}: the type of program ( ex. Android App or PC App etc... )
 * {@link #subTitle}: the project subtitle.
 * {@link #plannings}: the plannings of project.
 * {@link #results}: the results that after project complete.
 * {@link #example}: the examples that can experience the project result. {@link Example}
 * {@link #features}, {@link #features}: the features of project.{@link Feature}
 *
 * @author mommoo
 */
@Getter
@ToString(callSuper = true)
public class NormalProject extends BasicProject {
    private final String UIImage;
    private final List<String> programType;
    private final String subTitle;
    private final List<String> plannings;
    private final List<String> results;
    private final Example example;
    private final List<Feature> features;

    @PersistenceConstructor
    public NormalProject(int serialNumber, String title, String subTitle, String previewBannerImage, List<String> descriptions, Spec spec, List<String> skills,
                         String UIImage, List<String> programType, List<String> plannings, List<String> results, Example example, List<Feature> features) {
        super(serialNumber, title, previewBannerImage, descriptions, spec, skills);
        this.UIImage = UIImage;
        this.programType = programType;
        this.subTitle = subTitle;
        this.plannings = plannings;
        this.results = results;
        this.example = example;
        this.features = features;
    }

    /**c
     * To creating user experiences that see github source code, youtube video,blog or download app etc...
     *
     * @author mommoo
     */
    @Value
    @ToString
    public static class Example {
        private final String githubURL;
        private final String youtubeToken;
        private final String googleAppPackageName;
        private final String sampleURL;
        private final String blogURL;
    }

    /**
     * this data class have title of explanation group and resource that can represent of explanation group
     * <p>
     * {@link #title}: the title of the explanations
     * {@link #image}: the image file name that can represent of the explanations.
     * {@link #explanations}: the explanation about project's feature. {@link Explanation}
     *
     * @author mommoo
     */
    @Builder
    @Value
    @ToString
    public static class Feature {
        private final String title;
        private final String image;
        private final List<Explanation> explanations;
    }

    @Value
    @ToString
    public static class Explanation {
        private final String heading;
        private final List<String> descriptions;
    }
}
