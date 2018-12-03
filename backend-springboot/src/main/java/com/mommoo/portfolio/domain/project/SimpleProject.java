package com.mommoo.portfolio.domain.project;

import com.mommoo.portfolio.domain.resource.Resource;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * SimpleProject is persistence data class that basic structure of 'project' database data
 *
 * {@link #serialNumber}:
 *      project unique number value.
 * {@link #name}:
 *      project name.
 * {@link #previewBannerImage}:
 *      the file name of the resource that can see simple project view.
 *      it will be converted to file path by {@link #createCombinedWithResource(Resource)}.
 * {@link #descriptions}:
 *      descriptions of project.
 * {@link Spec}:
 *      programming spec of project.
 *      it will be converted to Spec combined with Resource{@link Resource} {@link Spec#createCombinedWithResource(Resource)}
 * {@link #skills}:
 *      programming skills used in project.
 *
 * @author mommoo
 */

//@FIXME(problem-1) Intelli-J Lombok Plug-in (v0.22.IDEA-EAP), not support @SuperConstructor code complete.
//  In the future, plug-in support @SuperConstructor code complete,
//  change from combination code (@AllArgConstructor + @Builder) to @SuperConstructor code

@AllArgsConstructor
@Builder
@Getter()
@ToString
@Document(collection = "project")
public class SimpleProject {
    private final int serialNumber;
    private final String name;
    private final String previewBannerImage;
    private final List<String> descriptions;
    private final Spec spec;
    private final List<String> skills;

    private SimpleProjectBuilder fillBuilderWithResource(SimpleProjectBuilder builder, Resource resource) {
        return builder
                .serialNumber(serialNumber)
                .name(name)
                .previewBannerImage(resource.getFilePath(previewBannerImage))
                .descriptions(new ArrayList<>(descriptions))
                .spec(spec.createCombinedWithResource(resource))
                .skills(new ArrayList<>(skills));
    }

    public SimpleProject createCombinedWithResource(Resource resource) {
        return fillBuilderWithResource(SimpleProject.builder(), resource).build();
    }
    //@FIXME(problem-1) To prevent field mapping mistake at Project class
    public Project.ProjectBuilder createProjectBuilderWithResource(Resource resource) {
        return (Project.ProjectBuilder) fillBuilderWithResource(Project.builder(), resource);
    }
}
