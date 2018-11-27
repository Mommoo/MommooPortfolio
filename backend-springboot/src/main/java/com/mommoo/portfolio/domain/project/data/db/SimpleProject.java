package com.mommoo.portfolio.domain.project.data.db;

import lombok.Getter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * SimpleProject is data class that basic structure of 'project' database data
 *
 * {@link #serialNumber}: project unique number value
 * {@link #name}: project name
 * {@link #previewBannerImage}: the file name of the image that can see simple project view
 * {@link #descriptions}: descriptions of project.
 * {@link Spec}: programming spec of project
 * {@link #skills}: programming skills used in project
 *
 * @author mommoo
 */
@Getter
@ToString
@Document(collection = "project")
public class SimpleProject {
    private int serialNumber;
    private String name;
    private String previewBannerImage;
    private List<String> descriptions;
    private Spec spec;
    private List<String> skills;
}
