package com.mommoo.portfolio.domain.project.data.db;

import lombok.Getter;
import lombok.ToString;

/**
 * this is data class for implementation that can experience project results
 *
 * To creating user experiences that
 * see github soure code or see youtube video or download app or see blog web page,
 *
 * this class provides the following data
 *
 * githubURL{@link #githubURL}: The Github URL you can see project source code
 *
 * youtube{@link Youtube}: This is the data we need to implement YouTube video.
 *
 * googleAppPackage{@link #googleAppPackage}: This is the data we need to download app from googlePlay
 *
 * blogURL{@link #blogURL}: The Blog URL introducing about project
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
     * We need following the three data to create youtube iframe element
     * To create YouTube html iframe element, you need to three kinds of data, as introduced below
     *
     * width{@link #width}: The value of youtube video contents width
     * height{@link #height}: The value of youtube video contents height
     * token{@link #token}: The value of youtube video contents unique token
     *
     * the following YouTube html iframe example is consist upper data
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
