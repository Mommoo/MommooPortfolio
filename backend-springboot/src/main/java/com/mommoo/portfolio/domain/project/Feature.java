package com.mommoo.portfolio.domain.project;

import com.mommoo.portfolio.domain.resource.Resource;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

/**
 * this data class have title of explanation group and resource that can represent of explanation group
 * Note. the resource is a file name that does not contain directory path {@link #image}
 *
 * {@link #title}:
 *      the title of the explanations
 * {@link #image}:
 *      the image file name that can represent of the explanations. it will be converted to image file path.
 *      {@link #createCombinedWithResource(Resource)}
 * {@link Explanation}, {@link #explanations}:
 *      the explanation about project's feature.
 *
 * @author mommoo
 */
@Builder
@Getter
@ToString
public class Feature {
    private final String title;
    private final String image;
    private final List<Explanation> explanations;

    Feature createCombinedWithResource(Resource resource) {
        return Feature.builder()
                .title(title)
                .image(resource.getFilePath(image))
                .explanations(new ArrayList<>(explanations))
                .build();
    }

    /** this is data class that have descriptions of the project's feature and heading of description group */
    @Getter
    @ToString
    public class Explanation {
        private String heading;
        private List<String> descriptions;
    }
}
