package com.mommoo.portfolio.domain.project.repository;

import com.mommoo.portfolio.domain.project.Project;
import com.mommoo.portfolio.domain.project.SimpleProject;

import java.util.List;

/**
 * @author mommoo
 */
public interface ProjectRepository {
    public List<Project> getProjects();
    public List<SimpleProject> getSimpleProjects();
}
