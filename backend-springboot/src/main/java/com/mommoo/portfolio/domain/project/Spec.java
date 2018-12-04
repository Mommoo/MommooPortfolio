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

    /**
     * icon property will be converted to file path from icon name {@link #createCombinedWithResource(Resource)}
     */
    @Builder
    @Getter
    @ToString
    public static class Item {
        private final String icon;
        private final String name;

        private Item createCombinedWithResource(Resource resource) {
            return Item.builder()
                    .icon(resource.getIconFilePath(icon))
                    .name(name)
                    .build();
        }
    }

    private List<Item> devEnvironments;
    private List<Item> runtimeEnvironments;
    private List<Item> languages;
    private List<Item> frameworks;
    private List<Item> libraries;

    private static List<Item> createItemListCombinedWithResource(List<Item> list, Resource resource) {
        return list.stream()
                .map(item -> item.createCombinedWithResource(resource))
                .collect(Collectors.toList());
    }

    Spec createCombinedWithResource(Resource resource) {
        return Spec.builder()
                .devEnvironments(createItemListCombinedWithResource(devEnvironments, resource))
                .runtimeEnvironments(createItemListCombinedWithResource(runtimeEnvironments, resource))
                .languages(createItemListCombinedWithResource(languages, resource))
                .frameworks(createItemListCombinedWithResource(frameworks, resource))
                .libraries(createItemListCombinedWithResource(libraries, resource))
                .build();
    }
}