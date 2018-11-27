package com.mommoo.portfolio.domain.project.data.db;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

/**
 * this data class have title of explanation group and image that can represent of explanation group
 * Note. the image is a file name that does not contain directory path {@link #image}
 *
 * {@link #title}: the title of the explanations
 * {@link #image}: the image that can represent of the explanations
 * {@link Explanation}, {@link #explanations} the explanation about project's feature
 *
 * @author mommoo
 */
@ToString
@Getter
public class Feature {
    private String title;
    private String image;
    private List<Explanation> explanations;

    /**
     * this is data class that have descriptions of the project's feature and heading of description group
     */
    @ToString
    @Getter
    public class Explanation {
        private String heading;
        private List<String> descriptions;
    }
}
