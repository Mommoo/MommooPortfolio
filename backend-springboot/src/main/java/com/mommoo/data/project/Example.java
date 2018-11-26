package com.mommoo.data.project;

import lombok.Getter;
import lombok.ToString;

/**
 * 프로젝트를 예시로 보여 줄 수 있는 플랫폼 URL을 담는 Data 클래스 입니다.
 * githubURL{@link #githubURL}: Github(https://www.github.com)에 저장된 소스를 볼 수 있는 URL 입니다.
 *
 * youtube{@link #youtube}: Youtube(https://www.youtube.com)에 저장된 동영상을
 * iframe 소스코드로 작성 하기 위해 필요한 정보 입니다. {@link Youtube}
 *
 * googleAppPackage{@link #googleAppPackage}: GooglePlay(https://www.play.google.com)플랫폼에 등록되어 있는 App의 package 정보 입니다.
 *
 * blogURL{@link #blogURL}: 프로젝트에 대해 소개하는 게시물의 URL 입니다.
 *
 * @author mommoo
 */
@ToString
@Getter
public class Example {
    private String githubURL;
    private Youtube youtube;
    private String googleAppPackage;
    private String blogURL;

    /**
     * Youtube 동영상을 html iframe 태그로 작성하기 위해서는 3가지 정보가 필요합니다.
     * width{@link #width}: 동영상의 너비 입니다.
     * height{@link #height}: 동영상의 높이 입니다.
     * token{@link #token}: 동영상의 고유 토큰 값 입니다.
     * 위 정보가 아래와 같이 매핑 되어 Youtube 동영상을 html iframe 태그로 작성됩니다.
     *
     * <iframe
     * width="{@link #width}"
     * height="{@link #height}"
     * src="https://www.youtube.com/embed/{@link #token}"
     * frameborder="0"
     * allow="accelerometer;
     * autoplay;
     * encrypted-media;
     * gyroscope;
     * picture-in-picture"
     * allowfullscreen></iframe>
     *
     * @author mommoo
     */
    @ToString
    @Getter
    public class Youtube {
        private int width;
        private int height;
        private String token;
    }
}
