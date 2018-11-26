package com.mommoo.data.project;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

/**
 * 프로젝트의 정보를 담는 Data 클래스입니다.
 *
 * {@link #serialNumber}: 프로젝트의 고유 인덱스 값 입니다.
 * {@link #name}: 프로젝트의 이름 입니다.
 * {@link BannerImage}: 프로젝트을 소개하는 배너 이미지 입니다.
 * {@link #descriptions}: 프로젝트 설명입니다.
 * {@link #plannings}: 프로젝트 기획입니다.
 * {@link Spec}: 프로젝트의 프로그래밍 스펙입니다.
 * {@link #skills}: 프로젝트에 사용된 기술입니다.
 * {@link #results}: 프로젝트를 진행한 후 얻은 결과 입니다.
 * {@link Example}: 프로젝트를 보여줄 수 있는 예시 입니다.
 * {@link Feature}: 프로젝트의 상세 설명입니다.
 *
 * @author mommoo
 */
@Getter
@ToString
public class Project {
    private int serialNumber;
    private String name;
    private BannerImage bannerImage;
    private List<String> descriptions;
    private List<String> plannings;
    private Spec spec;
    private List<String> skills;
    private List<String> results;
    private Example example;
    private List<Feature> features;
}