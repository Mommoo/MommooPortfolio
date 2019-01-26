import {environment} from '../../environments/environment';

export class RestAPIUrl {
  private static get fullHostURL() {
    const protocol = `${environment.serverMetaData.protocol}://`;
    const host = `${environment.serverMetaData.hostName}:${environment.serverMetaData.portNumber}`;
    const contextPath = `${environment.serverMetaData.contextPath}`;
    return `${protocol}${host}${contextPath}`;
  }

  public static get WebClient() {
    const webClientDataURI = `${RestAPIUrl.fullHostURL}/data/webclient`;
    return {
      introductionURL: () => `${webClientDataURI}/introduction`,
      allBasicProjectsURL: () => `${webClientDataURI}/project/basic/all`,
      normalProjectByTitleURL: (title: string) => `${webClientDataURI}/project/normal/${title}`
    };
  }

  public static get Resource() {
    const resourceDataURI = `${RestAPIUrl.fullHostURL}/data/resource/find`;

    return {
      findResourcePathURL: () => `${resourceDataURI}/path`,
      findAllPaperPathURL: () => `${resourceDataURI}/file/paper/all`
    };
  }

  private constructor() {

  }
}

