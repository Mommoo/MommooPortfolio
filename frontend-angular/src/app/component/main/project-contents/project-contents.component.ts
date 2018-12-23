import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {IEFixedImagePolyfill} from './IE-fixed-image-polyfill';
import {WebClientDataLoader} from '../../../server/webclient/web-client-resource.service';
import {a, b} from '@angular/core/src/render3';

@Component({
  selector: 'project-contents',
  templateUrl: './project-contents.component.html',
  styleUrls: ['./project-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContentsComponent implements OnInit, OnDestroy {
  private _backgroundURL;

  public constructor(private sanitizer: DomSanitizer,
              private webClientDataLoader: WebClientDataLoader,
              private changeDetector: ChangeDetectorRef) {

    IEFixedImagePolyfill.execute();

    webClientDataLoader
      .projectLoader
      .getNormalProject(1)
      .then(project => {
        this._backgroundURL = project.bannerImage;
        this.changeDetector.detectChanges();
      });
  }

  public ngOnInit() {

  }

  public get backgroundURL() {
    return this._backgroundURL;
  }

  public ngOnDestroy(): void {
    IEFixedImagePolyfill.clear();
  }
}
