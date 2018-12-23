import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebClient} from './web-client-types';
import {RestAPIUrl} from '../rest-api-url';

/**
 * This {@link WebClientDataLoader} have a responsibility
 * that communication with server REST API designed as `WebClient`
 *
 * To implementation of communication with server,
 * this class use the HttpClient API. {@link HttpClient}
 *
 * To provide WebClient communication API,
 * class design divided into several class as to WebClient's sub topics
 * {@link WebClientIntroduction}, {@link WebClientProject}, {@link WebClientImage}
 *
 * The result of communicated with server be made with the promise object
 *
 * @author mommoo
 */

@Injectable()
export class WebClientDataLoader {
  public readonly introductionLoader: WebClientIntroduction;
  public readonly projectLoader: WebClientProject;
  public readonly imageLoader: WebClientImage;

  public constructor(private httpClient: HttpClient) {
    this.introductionLoader = new WebClientIntroduction(httpClient);
    this.projectLoader = new WebClientProject(httpClient);
    this.imageLoader = new WebClientImage(httpClient);
  }
}

class WebClientIntroduction {
  public constructor(private httpClient: HttpClient) {

  }

  public async getProfileAsync() {
    return this.httpClient
      .get<WebClient.Introduction.Profile>(RestAPIUrl.WebClient.profileURL())
      .toPromise();
  }

  public async getLanguageTechsAsync() {
    return this.httpClient
      .get<WebClient.Introduction.LanguageTech[]>(RestAPIUrl.WebClient.languageTechsURL())
      .toPromise();
  }
}

class WebClientProject {
  public constructor(private httpClient: HttpClient) {

  }

  public async getAllBasicProjects() {
    return this.httpClient
      .get<WebClient.Project.Basic[]>(RestAPIUrl.WebClient.allBasicProjectsURL())
      .toPromise();
  }

  public async getNormalProject(serialNumber: number) {
    return this.httpClient
      .get<WebClient.Project.Normal>(RestAPIUrl.WebClient.normalProjectBySerialNumberURL(serialNumber))
      .toPromise();
  }
}

/**
 * The image path value is almost unchanged in server.
 * So to improve performance web application, if there is pre-found image path in cache,
 * the class provides the image that not request to server for image path but return cached image path
 */
class WebClientImage {
  private cachedImageFinder: Map<string, string> = new Map<string, string>();

  public constructor(private httpClient: HttpClient) {}

  private filterNewImageNamesToFind(...imageNames: string[]) {
    return imageNames.filter(imageName => !this.cachedImageFinder.has(imageName));
  }

  public async getFindImagePaths(...imageNames: string[]) {
    const newImageNamesToFind = this.filterNewImageNamesToFind(...imageNames);

    if (newImageNamesToFind.length > 0) {

      const imageFilePathObject
        = await this.httpClient
        .post(RestAPIUrl.WebClient.findImagePathURL(), newImageNamesToFind)
        .toPromise();

      Object
        .keys(imageFilePathObject)
        .forEach(imageName => this.cachedImageFinder.set(imageName, imageFilePathObject[imageName]));
    }

    return new Map<string, string>(this.cachedImageFinder);
  }
}
