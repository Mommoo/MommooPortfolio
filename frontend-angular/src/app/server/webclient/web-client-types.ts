/**
 * This types definition files indicate data type that result of communication with server api
 */

/**
 * This module indicate data type of server's data named WebClient
 */
export module WebClient {
  export interface Introduction {
    readonly profile: Profile;
    readonly languageTechs: LanguageTech[];
  }

  export interface Profile {
    readonly name: string;
    readonly lastTwoOfBirthYear: string;
    readonly age: number;
    readonly degree: string[];
  }

  export interface LanguageTech {
    readonly name: string;
    readonly image: string;
    readonly briefings: string[];
  }

  export module Project {
    export interface Basic {
      readonly serialNumber: number;
      readonly title: string;
      readonly previewBannerImage: string;
      readonly descriptions: string[];
      readonly spec: Spec;
      readonly skills: string[];
    }

    export interface Normal extends Basic {
      readonly UIImage: string;
      readonly programType: string[];
      readonly subTitle: string;
      readonly plannings: string[];
      readonly results: string[];
      readonly example: Example;
      readonly features: Feature[];
    }

    export interface Spec {
      readonly devEnvironments: SpecItem[];
      readonly runtimeEnvironments: SpecItem[];
      readonly languages: SpecItem[];
      readonly frameworks: SpecItem[];
      readonly libraries: SpecItem[];
    }

    export interface SpecItem {
      readonly image: string;
      readonly name: string;
    }

    export interface Example {
      readonly github: URLExample;
      readonly youtube: YoutubeExample;
      readonly googleApp: GoogleAppExample;
      readonly sample: URLExample;
      readonly blog: URLExample;
    }

    export interface IconExample {
      readonly image: string;
    }

    export interface URLExample extends IconExample {
      readonly url: string;
    }

    export interface YoutubeExample extends IconExample {
      readonly token: string;
    }

    export interface GoogleAppExample extends IconExample {
      readonly packageName: string;
    }

    export interface Feature {
      readonly title: string;
      readonly image: string;
      readonly explanations: Explanation[];
    }

    export interface Explanation {
      readonly heading: string;
      readonly descriptions: string[];
    }
  }
}
