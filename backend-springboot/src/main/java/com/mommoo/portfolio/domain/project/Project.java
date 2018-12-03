package com.mommoo.portfolio.domain.project;

import com.mommoo.portfolio.domain.resource.Resource;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Project is data class that implement the specification of 'project' database data
 * <p>
 * {@link SimpleProject}:
 *      the basic project data properties.
 * {@link #bannerImage}:
 *      the banner image file name. it will be converted to image file path by {@link #createCombinedWithResource(Resource)}.
 * {@link #plannings}:
 *      the plannings of project.
 * {@link #results}:
 *      the results that after project complete.
 * {@link Example}:
 *      the examples that can experience the project result.
 *      it will be converted to Example combined with Resource {@link Example#createCombinedWithResource(Resource)}
 * {@link Feature}, {@link #features}: the features of project.
 *      it will be converted to list of Feature combined with Resource {@link Feature#createCombinedWithResource(Resource)}
 *
 * @author mommoo
 */

@Getter
@ToString(callSuper = true)
public class Project extends SimpleProject {
    private final String bannerImage;
    private final List<String> plannings;
    private final List<String> results;
    private final Example example;
    private final List<Feature> features;

    /** @see SimpleProject's FIXME */
    //@FIXME(problem-1) this code problem derived by not supported of @SuperBuilder
    @Builder()
    public Project(int serialNumber, String name, String previewBannerImage, List<String> descriptions, Spec spec, List<String> skills,
                   String bannerImage, List<String> plannings, List<String> results, Example example, List<Feature> features) {

        super(serialNumber, name, previewBannerImage, descriptions, spec, skills);

        this.bannerImage = bannerImage;
        this.plannings = plannings;
        this.results = results;
        this.example = example;
        this.features = features;
    }
    //@FIXME(problem-1) To implements inheritance builder as not supported @SuperBuilder
    public static class ProjectBuilder extends SimpleProjectBuilder {
        ProjectBuilder() {
            super();
        }
    }

    private List<Feature> createFeatureListWithResource(Resource resource) {
        return features
                .stream()
                .map(feature -> feature.createCombinedWithResource(resource))
                .collect(Collectors.toList());
    }

    @Override
    public Project createCombinedWithResource(Resource resource) {
        return super.createProjectBuilderWithResource(resource)
                .bannerImage(resource.getFilePath(bannerImage))
                .plannings(plannings)
                .results(results)
                .example(example.createCombinedWithResource(resource))
                .features(createFeatureListWithResource(resource))
                .build();
    }
}