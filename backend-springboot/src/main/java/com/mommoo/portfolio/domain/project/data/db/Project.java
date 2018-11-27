package com.mommoo.portfolio.domain.project.data.db;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

/**
 * Project is data class that implement the specification of 'project' database data
 *
 * {@link SimpleProject}: the basic project data properties
 * {@link #plannings}: the plannings of project
 * {@link #results}: the results that after project complete
 * {@link Example}: the examples that can experience the project result
 * {@link Feature}, {@link #features}: the features of project
 *
 * @author mommoo
 */
@Getter
@ToString
public class Project extends SimpleProject{
    private List<String> plannings;
    private List<String> results;
    private Example example;
    private List<Feature> features;
}