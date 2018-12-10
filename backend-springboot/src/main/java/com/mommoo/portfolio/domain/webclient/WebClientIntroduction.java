package com.mommoo.portfolio.domain.webclient;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.mommoo.portfolio.domain.introduction.Introduction;
import lombok.Getter;
import lombok.ToString;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

/**
 * This class is decorating data {@link Introduction}
 * that several data be converted to web client data {@link WebClientResource}
 *
 * @author mommoo
 */
@Getter
@ToString
class WebClientIntroduction {
    private final WebClientProfile profile;
    private final List<WebClientLanguageTech> languageTechs;

    WebClientIntroduction(Introduction introduction, WebClientResource webClientResource) {
        this.profile = new WebClientProfile(introduction.getProfile());
        this.languageTechs = createWebClientLangTechList(introduction.getLanguageTechs(), webClientResource);
    }

    private static List<WebClientLanguageTech> createWebClientLangTechList(List<Introduction.LanguageTech> languageTechList, WebClientResource webClientResource) {
        return languageTechList
                .stream()
                .map(languageTech -> new WebClientLanguageTech(languageTech, webClientResource))
                .collect(Collectors.toList());
    }

    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    @ToString
    static class WebClientProfile {
        private final String name;
        private final String lastTwoOfBirthYear;
        private final int age;
        private final List<String> degree;

        WebClientProfile(Introduction.Profile profile) {
            this.name = profile.getName();
            this.lastTwoOfBirthYear = computeLastTwoOfBirthYear(profile.getBirthYear());
            this.age = computeAge(profile.getBirthYear());
            this.degree = profile.getDegree();
        }

        private String computeLastTwoOfBirthYear(int birthYear) {
            String sBirthYear = Integer.toString(birthYear);
            return sBirthYear.substring(sBirthYear.length() - 2);
        }

        private int computeAge(int birthYear) {
            Calendar calendar = Calendar.getInstance();
            return calendar.get(Calendar.YEAR) -  birthYear + 1;
        }
    }

    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    @ToString
    static class WebClientLanguageTech {
        private final String name;
        private final String image;
        private final List<String> briefings;

        private WebClientLanguageTech(Introduction.LanguageTech languageTech, WebClientResource webClientResource) {
            this.name = languageTech.getName();
            this.image = webClientResource.findImageFile(languageTech.getImage());
            this.briefings = languageTech.getBriefings();
        }
    }
}
