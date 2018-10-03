import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, Injector, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AppToolkit} from '../../app-toolkit';

@Component({
  selector: 'view-banner-page',
  templateUrl: './banner-page.component.html',
  styleUrls: ['./banner-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerPageTemplate {
  public title: string;
  public subTitles: string[];
}

export abstract class BannerPageComponent {
  @ViewChild('banner', {read: ViewContainerRef})
  private bannerContainerRef: ViewContainerRef;

  private _componentFactoryResolver = AppToolkit.getInstance().getComponentFactoryResolver();

  protected constructor() {
    setTimeout(()=> {
      this.createBanner();
    }, 0)
  }

  protected abstract getPageTitle(): string;

  protected abstract getPageSubTitle(): string[];

  private createBanner() {
    const bannerCompRef = this._componentFactoryResolver.resolveComponentFactory(BannerPageTemplate);
    const compRef = this.bannerContainerRef.createComponent(bannerCompRef);
    compRef.instance.title = this.getPageTitle();
    compRef.instance.subTitles = this.getPageSubTitle();
    compRef.changeDetectorRef.detectChanges();
  }
}
