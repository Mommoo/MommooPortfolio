export class RestAPIUrl {
  private static readonly serverMetaData = {
    protocol: 'http',
    hostName: '192.168.0.10',
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
    const webClientDataURI = `${RestAPIUrl.fullHostURL}/webclient`;
    return {
      profileURL: () => `${webClientDataURI}/introduction/profile`,
      languageTechsURL: () => `${webClientDataURI}/introduction/languageTechs`,
      allBasicProjectsURL: () => `${webClientDataURI}/project/basic/all`,
      normalProjectBySerialNumberURL: (serialNumber: number) => `${webClientDataURI}/project/normal/${serialNumber}`,
      findImagePathURL: () => `${webClientDataURI}/image`
    };
  }

  private constructor() {

  }
}
