package com.mommoo.portfolio.domain.project.repository;

import com.mommoo.portfolio.domain.project.data.db.Project;
import com.mommoo.portfolio.domain.project.data.db.SimpleProject;

import java.util.List;

/**
 * @author mommoo
 */
public interface ProjectRepository {
    public List<Project> getProjects();
    public List<SimpleProject> getSimpleProjects();
}
