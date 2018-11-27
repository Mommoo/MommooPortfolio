package com.mommoo.portfolio.project.data.db;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

/**
 * 프로젝트의 프로그래밍 스펙 정보를 담는 Data 클래스입니다.
 *
 * devEnvironment{@link #devEnvironments}: 프로젝트의 개발 환경입니다.
 * runtimeEnvironment{@link #runtimeEnvironments}: 프로젝트가 실행될 클라이언트 환경입니다.
 * language{@link #languages}: 프로젝트에 사용된 프로그래밍 언어 입니다.
 * framework{@link #framworks}: 프로젝트에 사용된 프레임워크 입니다.
 * library{@link #libraries}: 프로젝트에 사용된 라이브러리 입니다.
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