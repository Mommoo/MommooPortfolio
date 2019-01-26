package com.mommoo.portfolio.domain.webclient;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mommoo.portfolio.domain.project.BasicProject;
import com.mommoo.portfolio.domain.project.BasicProject.Spec;
import com.mommoo.portfolio.domain.project.BasicProject.SpecItem;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

/**
 * This class provides data that is exposed to web client.
 * The data type is similar to {@link BasicProject} Entity.
 * But to enable web client to using it,
 * several data need to be restructured with the help of {@link WebImageResourceBuilder}.
 *
 * @author mommoo
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@ToString
public class WebClientBasicProject {
    private final int serialNumber;
    private final String title;
    private final String previewBannerImage;
    private final List<String> descriptions;
    private final Spec spec;
    private final List<String> skills;

    @JsonIgnore
    protected WebImageResourceBuilder webImageResourceBuilder;

    WebClientBasicProject(BasicProject project, WebImageResourceBuilder webImageResourceBuilder) {
        this.webImageResourceBuilder = webImageResourceBuilder;

        this.serialNumber = project.getSerialNumber();
        this.title = project.getTitle();
        this.previewBannerImage = webImageResourceBuilder.buildWebImagePath(project.getPreviewBannerImage());
        this.descriptions = project.getDescriptions();
        this.spec = createWebClientSpec(project.getSpec());
        this.skills = project.getSkills();
    }

    private Spec createWebClientSpec(Spec spec) {
        return Spec
                .builder()
                .devEnvironments(createWebClientSpecItemList(spec.getDevEnvironments()))
                .runtimeEnvironments(createWebClientSpecItemList(spec.getRuntimeEnvironments()))
                .languages(createWebClientSpecItemList(spec.getLanguages()))
                .frameworks(createWebClientSpecItemList(spec.getFrameworks()))
                .libraries(createWebClientSpecItemList(spec.getLibraries()))
                .build();
    }

    private List<SpecItem> createWebClientSpecItemList(List<SpecItem> specItemList) {
        return specItemList
                .stream()
                .map(this::createWebClientSpecItem)
                .collect(Collectors.toList());
    }

    private SpecItem createWebClientSpecItem(SpecItem specItem) {
        return SpecItem
                .builder()
                .name(specItem.getName())
                .image(this.webImageResourceBuilder.buildWebImagePath(specItem.getImage()))
                .build();
    }
}
