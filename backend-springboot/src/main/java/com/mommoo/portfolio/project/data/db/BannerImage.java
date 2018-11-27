package com.mommoo.portfolio.project.data.db;

import lombok.Getter;
import lombok.ToString;

/**
 *
 * 배너 이미지 파일 이름을 담는 Data 클래스 입니다.
 * 경로가 제외 된 순수 파일명만 담습니다.
 *
 * @author mommoo
 */
@Getter
@ToString
public class BannerImage {
    private String small;
    private String big;
}
