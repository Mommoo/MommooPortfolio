export module Project {
  export interface Detail extends Simple {
    description: string
  }

  export interface Simple {
    projectNumber: number,
    title: string,
    imagePath: string,
    summary: string,
    devSkills: Array<string>
  }
}

export interface Skill {
  name : string
  imagePath : string,
  hashTagMessages : Array<string>
}
