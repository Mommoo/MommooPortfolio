import {Component, Input, OnInit} from '@angular/core';
import {FooterContents} from './footer.types';
import {AppResourceFinder} from '../../../app.types';
import {ImageResourceType} from '../../../server/resource/resource.types';

@Component({
  selector: 'view-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private static readonly developBeginYear = 2018;

  @Input()
  private appResourceFinder: AppResourceFinder;

  private footerContents: FooterContents[];

  private readonly _copyrightYear: string;

  public constructor() {
    this._copyrightYear = FooterComponent.createCopyrightYear();
  }

  private static openNewPage(url: string) {
    window.open(url, '_blank');
  }

  private static createCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const isDevelopCurrentYear = FooterComponent.developBeginYear === currentYear;
    return `${FooterComponent.developBeginYear}` + (isDevelopCurrentYear ? `` : `-${currentYear}`);
  }

  public ngOnInit() {
    this.footerContents = [
      {
        icon: this.appResourceFinder.icon.get(ImageResourceType.GITHUB),
        text: 'https://github.com/Mommoo',
        onClick() {
          FooterComponent.openNewPage(this.text);
        }
      },
      {
        icon: this.appResourceFinder.icon.get(ImageResourceType.TISTORY),
        text: 'https://mommoo.tistory.com',
        onClick() {
          FooterComponent.openNewPage(this.text);
        }
      },
      {
        icon: this.appResourceFinder.icon.get(ImageResourceType.MAIL),
        text: 'dv.Mommoo@gmail.com',
        onClick() {
          location.href = `mailto:${this.text}`;
        }
      }
    ];
  }

  public get contents() {
    return this.footerContents;
  }

  public get copyrightYear() {
    return this._copyrightYear;
  }
}
