/**
 * This types definition files indicate data type that result of communication with server api
 *
 */

/**
 * This module indicate data type of server's data named WebClient
 */
export module WebClient {
  export module Introduction {
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
  }

  export module Project {
    export interface Basic {
      readonly serialNumber: number;
      readonly name: string;
      readonly previewBannerImage: string;
      readonly descriptions: string[];
      readonly spec: Spec;
      readonly skills: string[];
    }

    export interface Normal extends Basic {
      readonly bannerImage: string;
      readonly plannings: string[];
      readonly results: string[];
      readonly example: Example;
    }

    interface Spec {
      readonly devEnvironments: SpecItem[];
      readonly runtimeEnvironments: SpecItem[];
      readonly languages: SpecItem[];
      readonly frameworks: SpecItem[];
      readonly libraries: SpecItem[];
    }

    interface SpecItem {
      readonly image: string;
      readonly name: string;
    }

    interface Example {
      readonly github: URLExample;
      readonly youtube: YoutubeExample;
      readonly googleApp: GoogleAppExample;
      readonly sample: URLExample;
      readonly blog: URLExample;
    }

    interface URLExample {
      readonly image: string;
      readonly url: string;
    }

    interface YoutubeExample {
      readonly image: string;
      readonly token: string;
    }

    interface GoogleAppExample {
      readonly image: string;
      readonly packageName: string;
    }
  }
}
