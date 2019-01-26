import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestAPIUrl} from '../rest-api-url';
import {Observable} from 'rxjs';
import {
  FileResourceType,
  ImageResourceType,
  MommooPaper,
  WebResourcePath
} from './resource.types';
import {map, share, tap} from 'rxjs/operators';

/**
 * This service provides rest communication with server about finding resource path
 *
 * To implementation of communication with server,
 * this class use the HttpClient API. {@link HttpClient}
 *
 * @author mommoo
 */
@Injectable()
export class ResourceHttpClient {
  private webResourcePathObservable: Observable<WebResourcePath>;

  public constructor(private httpClient: HttpClient) {
    this.webResourcePathObservable = this.createWebResourcePathObservable();
  }

  private createWebResourcePathObservable() {
    return this.httpClient
      .get<WebResourcePath>(RestAPIUrl.Resource.findResourcePathURL())
      .pipe(
        share()
      );
  }

  private getResource<T>(resourceType: 'image' | 'file') {
    const isImageType = resourceType === 'image';

    const findTargetPath = (resourcePath: WebResourcePath) => {
      return isImageType ? resourcePath.imageResourcePath : resourcePath.fileResourcePath;
    };

    const targetEnumObj = isImageType ? ImageResourceType : FileResourceType;

    return this.webResourcePathObservable.pipe(
      map(resourcePath => findTargetPath(resourcePath)),
      map(targetPath =>
        Object.keys(targetEnumObj)
          .map(key => [targetEnumObj[key] as any, `${targetPath}/${targetEnumObj[key]}`])
      ),
      map(entries => entries as [T, string][]),
      map(entries => new Map(entries)),
      share()
    );
  }

  public getImageResources() {
    return this.getResource<ImageResourceType>('image');
  }

  public getFileResource() {
    return this.getResource<FileResourceType>('file');
  }

  public getAllPaperResources() {
    const url = RestAPIUrl.Resource.findAllPaperPathURL();
    return this.httpClient.get(url).pipe(
      map(object => Object.keys(object).map(key => [key, object[key]])),
      map(entries => entries.map(value => ({
        name: value[0],
        fileWebPath: value[1]
      }) as MommooPaper )),
      share()
    );
  }
}
