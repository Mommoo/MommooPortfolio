package com.mommoo.data.project;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

/**
 * 프로젝트의 특징을 제목과 이미지, 상세 설명들 을 담는 Data 클래스입니다.
 *
 * 이미지는 경로를 제외한 단순 파일 명 입니다.{@link #image}
 *
 * @author mommoo
 */
@ToString
@Getter
public class Feature {
    private String title;
    private String image;
    private List<Explanation> explanations;

    @ToString
    @Getter
    public class Explanation {
        private String heading;
        private List<String> descriptions;
    }
}
