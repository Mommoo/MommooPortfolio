package com.mommoo.portfolio.domain.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Value;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * BasicProject is persistence DTO class that basic of 'project' database data.
 *
 * {@link #serialNumber}: the project unique number value.
 * {@link #name}: the project name.
 * {@link #previewBannerImage}: the file name of the resource that can see simple project view.
 * {@link #descriptions}: the descriptions of project.
 * {@link #spec}: the programming specification of project. {@link Spec}
 * {@link #skills}: the programming skills used in project.
 *
 * @author mommoo
 */
@AllArgsConstructor
@Getter
@Document(collection = "project")
public class BasicProject {
    private final int serialNumber;
    private final String name;
    private final String previewBannerImage;
    private final List<String> descriptions;
    private final Spec spec;
    private final List<String> skills;

    /**
     * This is data class that contains the programming specifications of the project.
     * Programming specifications introduced following
     *
     * devEnvironment{@link #devEnvironments}: the develop environments of the project
     * runtimeEnvironment{@link #runtimeEnvironments}: the runtime environments of the project
     * language{@link #languages}: the programming languages used in project
     * framework{@link #frameworks}: the programming frameworks used in project
     * library{@link #libraries}: the programming libraries used in project
     *
     * All specifications consist of ITEM{@link SpecItem}
     * */
    @Builder
    @Value
    public static class Spec {
        private final List<SpecItem> devEnvironments;
        private final List<SpecItem> runtimeEnvironments;
        private final List<SpecItem> languages;
        private final List<SpecItem> frameworks;
        private final List<SpecItem> libraries;
    }

    @Builder
    @Value
    public static class SpecItem {
        private final String image;
        private final String name;
    }
}
