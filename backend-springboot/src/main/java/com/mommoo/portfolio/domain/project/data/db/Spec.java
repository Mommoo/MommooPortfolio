package com.mommoo.portfolio.domain.project.data.db;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

/**
 * this is data class that contains the programming specifications of the project
 * programming specifications introduced following
 *
 * devEnvironment{@link #devEnvironments}: the develop environments of the project
 * runtimeEnvironment{@link #runtimeEnvironments}: the runtime environments of the project
 * language{@link #languages}: the programming languages used in project
 * framework{@link #framworks}: the programming frameworks used in project
 * library{@link #libraries}: the programming libraries used in project
 *
 * @author mommoo
 */
@ToString
@Getter
public class Spec {
    private List<String> devEnvironments;
    private List<String> runtimeEnvironments;
    private List<String> languages;
    private List<String> framworks;
    private List<String> libraries;
}