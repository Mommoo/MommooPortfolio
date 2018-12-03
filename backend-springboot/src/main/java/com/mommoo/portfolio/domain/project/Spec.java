package com.mommoo.portfolio.domain.project;

import com.mommoo.portfolio.domain.resource.Resource;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

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
 * All specifications consist of ITEM{@link Item}
 *
 * This will be provide by REST API {@link com.mommoo.portfolio.controller.RestDataController}
 * after converted to data that appended resource path to 'icon' data
 *
 * @author mommoo
 */
@Builder
@Getter
@ToString
public class Spec {

    @Getter
    @ToString
    public class Item {
        private String image;
        private String name;
    }

    private List<Item> devEnvironments;
    private List<Item> runtimeEnvironments;
    private List<Item> languages;
    private List<Item> frameworks;
    private List<Item> libraries;

    private static List<Item> createItemListWithResource(List<Item> list, Resource resource) {
        return list.stream()
                .peek(item -> item.image = resource.getFilePath(item.image))
                .collect(Collectors.toList());
    }

    Spec createCombinedWithResource(Resource resource) {
        return Spec.builder()
                .devEnvironments(createItemListWithResource(devEnvironments, resource))
                .runtimeEnvironments(createItemListWithResource(runtimeEnvironments, resource))
                .languages(createItemListWithResource(languages, resource))
                .frameworks(createItemListWithResource(frameworks, resource))
                .libraries(createItemListWithResource(libraries, resource))
                .build();
    }
}