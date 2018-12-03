package com.mommoo.portfolio.domain.project;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mommoo.portfolio.domain.resource.Resource;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.AccessType;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * This class binding persistence data by setter {@link #setGitHubURL(String)}, {@link #setBlogURL(String)} etc...
 * The reason is that {@link Example} class data need to append icon property
 * Icon properties will be converted to icon file path from icon name with Resource
 * {@link Resource}, {@link #createCombinedWithResource(Resource)}
 *
 * To creating user experiences that
 * see github source code or see youtubeIFrame video or download app or see blog web page,
 * this class provides the following data
 *
 * github{@link URL}: have the Github URL you can see project source code and icon file path of github
 * youtube{@link Youtube}: have the data we need to implement YouTube video and icon file path of youtube
 * googlePlay{@link GooglePlay}: have Google App's package name we need to download app from googlePlay and icon file path of googlePlay
 * blog{@link URL}: have the Blog URL introducing about project and icon file path of blog
 *
 * @author mommoo
 */
//@FIXME(problem-1) inheritance builder
//  All of inner class @Builder annotation append to constructor
//  this class will be modify that remove constructor and move @Builder annotation to Class

@Builder
@Getter
@ToString
class Example {
    private URL github;
    private Youtube youtube;
    private GooglePlay googlePlay;
    private URL blog;

    @JsonIgnore()
    @AccessType(AccessType.Type.PROPERTY)
    @Field("githubURL")
    public void setGitHubURL(String githubURL) {
        this.github = URL.builder()
                .icon("github")
                .url(githubURL)
                .build();
    }

    @JsonIgnore()
    @AccessType(AccessType.Type.PROPERTY)
    @Field("youtubeIFrame")
    public void setYoutubeIFrame(YoutubeIFrame youtubeIFrame) {
        this.youtube = Youtube.builder()
                .icon("youtube")
                .width(youtubeIFrame.width)
                .height(youtubeIFrame.height)
                .token(youtubeIFrame.token)
                .build();
    }

    @JsonIgnore()
    @AccessType(AccessType.Type.PROPERTY)
    @Field("googleAppPackageName")
    public void setGoogleAppPackageName(String googleAppPackageName) {
        this.googlePlay = GooglePlay.builder()
                .icon("googlePlay")
                .packageName(googleAppPackageName)
                .build();
    }


    @JsonIgnore()
    @AccessType(AccessType.Type.PROPERTY)
    @Field("blogURL")
    public void setBlogURL(String blogURL) {
        this.blog = URL.builder()
                .icon("blog")
                .url(blogURL)
                .build();
    }

    /** convert icon name to icon file path with Resource {@link Resource} */
    Example createCombinedWithResource(Resource resource) {
        return Example.builder()
                .github(this.github.createCombinedWithResource(resource))
                .youtube(this.youtube.createCombinedWithResource(resource))
                .googlePlay(this.googlePlay.createCombinedWithResource(resource))
                .blog(this.blog.createCombinedWithResource(resource))
                .build();
    }

    /** Declare classes have 'icon' property */

    @Builder
    @Getter
    @ToString
    private static class URL {
        public String icon;
        public final String url;

        private URL createCombinedWithResource(Resource resource) {
            return URL.builder()
                    .icon(resource.getIconFilePath(icon))
                    .url(url)
                    .build();
        }
    }

    /**
     * We need following the three data to create youtubeIFrame iframe element
     * To create YouTube html iframe element, you need to three kinds of data, as introduced below
     *
     * width{@link #width}: The value of youtubeIFrame video contents width
     * height{@link #height}: The value of youtubeIFrame video contents height
     * token{@link #token}: The value of youtubeIFrame video contents unique token
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
    private static class YoutubeIFrame {
        private int width;
        private int height;
        private String token;
    }

    @Builder
    @Getter
    @ToString
    private static class Youtube {
        private final String icon;
        private final int width;
        private final int height;
        private final String token;

        private Youtube createCombinedWithResource(Resource resource) {
            return Youtube.builder()
                    .icon(resource.getIconFilePath(icon))
                    .width(width)
                    .height(height)
                    .token(token)
                    .build();
        }
    }

    @Builder
    @Getter
    @ToString
    private static class GooglePlay {
        private final String icon;
        private final String packageName;

        private GooglePlay createCombinedWithResource(Resource resource) {
            return GooglePlay.builder()
                    .icon(resource.getIconFilePath(icon))
                    .packageName(packageName)
                    .build();
        }
    }
}
