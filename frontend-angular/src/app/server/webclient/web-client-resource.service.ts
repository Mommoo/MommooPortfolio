import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebClient} from './web-client-types';
import {RestAPIUrl} from '../rest-api-url';
import {fromPromise} from 'rxjs/internal-compatibility';

/**
 * This {@link WebClientHttpClient} have a responsibility
 * that communication with server REST API designed as `WebClient`
 *
 * To implementation of communication with server,
 * this class use the HttpClient API. {@link HttpClient}
 *
 * The result of communicated with server be made with the observer object
 *
 * @author mommoo
 */

@Injectable()
export class WebClientHttpClient {
  private readonly imageLoader: WebClientImage;

  public constructor(private httpClient: HttpClient) {
    this.imageLoader = new WebClientImage(httpClient);
  }

  @ExecutorInspector()
  public getIntroduction() {
    return this.httpClient
      .get<WebClient.Introduction>(RestAPIUrl.WebClient.introductionURL());
  }

  @ExecutorInspector()
  public getAllBasicProjects() {
    return this.httpClient
      .get<WebClient.Project.Basic[]>(RestAPIUrl.WebClient.allBasicProjectsURL());
  }

  @ExecutorInspector()
  public getNormalProject(title: string) {
    return this.httpClient
      .get<WebClient.Project.Normal>(RestAPIUrl.WebClient.normalProjectByTitleURL(title));
  }

  @ExecutorInspector()
  public getImagePath<T>(...imageNames: string[]) {
    return this.imageLoader.getImagePaths<T>(...imageNames);
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

  private async findImagePaths<T>(...imageNames: string[]) {
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

    const entries = [];
    imageNames.forEach(imageName => entries.push([imageName, this.cachedImageFinder.get(imageName)]));
    return new Map<T, string>(entries);
  }

  public getImagePaths<T>(...imageNames: string[]) {
    return fromPromise(this.findImagePaths<T>(...imageNames));
  }
}

function ExecutorInspector() {
  return function(target: any, propName: string, descriptor: PropertyDescriptor) {
    const originalFunction: Function = descriptor.value;
    descriptor.value = function() {
      console.log(`${propName} method is invoked`);
      return originalFunction.apply(this, arguments);
    };
    return descriptor;
  };
}
