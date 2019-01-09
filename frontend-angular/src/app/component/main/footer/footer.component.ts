import {ChangeDetectorRef, Component} from '@angular/core';
import {AppImageNameType, AppImagePathFinder} from '../../../app-image-finder.service';
import {FooterContents} from './footer.types';

@Component({
  selector: 'view-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private _isReadyImage;
  private footerContents: FooterContents[];

  public constructor(appImagePathFinder: AppImagePathFinder, changeDetector: ChangeDetectorRef) {
    const subscription = appImagePathFinder.observable.subscribe(imageMap => {
        this.footerContents = [
          {
            icon: imageMap.get(AppImageNameType.GITHUB),
            text: 'https://github.com/Mommoo',
            onClick() {
              alert('github!');
            }
          },
          {
            icon: imageMap.get(AppImageNameType.TISTORY),
            text: 'https://mommoo.tistory.com',
            onClick() {
              alert('tistory!!');
            }
          },
          {
            icon: imageMap.get(AppImageNameType.MAIL),
            text: 'dv.Mommoo@gmail.com',
            onClick() {
              alert('mail!');
            }
          }
        ];
        changeDetector.detectChanges();
        subscription.unsubscribe();
      });
  }

  public get isReadyImage() {
    return this._isReadyImage;
  }

  public get contents() {
    return this.footerContents;
  }
}
