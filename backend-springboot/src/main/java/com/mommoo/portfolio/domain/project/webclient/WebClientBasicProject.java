package com.mommoo.portfolio.domain.project.webclient;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mommoo.portfolio.domain.project.BasicProject;
import com.mommoo.portfolio.domain.project.BasicProject.Spec;
import com.mommoo.portfolio.domain.project.BasicProject.SpecItem;
import lombok.Builder;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

/**
 * This class provides data that is exposed to web client.
 * The data type is similar to {@link BasicProject} Entity.
 * But to enable web client to using it,
 * several data need to be restructured with the help of {@link WebClientResource}.
 *
 * @author mommoo
 */
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@ToString
public class WebClientBasicProject {
    private final int serialNumber;
    private final String name;
    private final String previewBannerImage;
    private final List<String> descriptions;
    private final Spec spec;
    private final List<String> skills;

    @JsonIgnore
    protected WebClientResource webClientResource;

    @Builder
    WebClientBasicProject(WebClientResource webClientResource) {
        this.webClientResource = webClientResource;

        BasicProject basicProject = webClientResource.getProject();
        this.serialNumber = basicProject.getSerialNumber();
        this.name = basicProject.getName();
        this.previewBannerImage = webClientResource.findImageFile(basicProject.getPreviewBannerImage());
        this.descriptions = basicProject.getDescriptions();
        this.spec = createWebClientSpec(basicProject.getSpec());
        this.skills = basicProject.getSkills();
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
                .image(webClientResource.findImageFile(specItem.getImage()))
                .build();
    }
}
