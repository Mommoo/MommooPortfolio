package com.mommoo.portfolio.domain.introduction;

import lombok.Getter;
import lombok.ToString;
import lombok.Value;

import java.util.List;

/**
 * This is persistence class of MongoDB's collection 'introduction'.
 * The Profile{@link #profile}, {@link Profile} is the information of developer Mommoo.
 * The Language Technology{@link #languageTechs}, {@link LanguageTech} is the programming languages
 * that Developer Mommoo able to using at programming develop
 *
 * @author mommoo
 */
@Getter
@ToString
public class Introduction {
    private Profile profile;
    private List<LanguageTech> languageTechs;

    @Value
    @ToString
    public static class Profile {
        private final String name;
        private final int birthYear;
        private final String sex;
        private final List<String> degree;
    }

    @Value
    @ToString
    public static class LanguageTech {
        private final String name;
        private final String image;
        private final List<String> briefings;
    }
}
