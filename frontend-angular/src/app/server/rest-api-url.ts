export class RestAPIUrl {
  private static readonly serverMetaData = {
    protocol: 'http',
    // hostName: '192.168.0.10',
    hostName: 'localhost',
    portNumber: '8080',
    contextPath: '/mommoo-portfolio'
  };

  private static get fullHostURL() {
    const protocol = `${RestAPIUrl.serverMetaData.protocol}://`;
    const host = `${RestAPIUrl.serverMetaData.hostName}:${RestAPIUrl.serverMetaData.portNumber}`;
    const contextPath = `${RestAPIUrl.serverMetaData.contextPath}`;
    return `${protocol}${host}${contextPath}`;
  }

  public static get WebClient() {
    const webClientDataURI = `${RestAPIUrl.fullHostURL}/data/webclient`;
    return {
      introductionURL: () => `${webClientDataURI}/introduction`,
      allBasicProjectsURL: () => `${webClientDataURI}/project/basic/all`,
      normalProjectByTitleURL: (title: string) => `${webClientDataURI}/project/normal/${title}`,
      findImagePathURL: () => `${webClientDataURI}/image`
    };
  }

  private constructor() {

  }
}

