import {ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {AppToolkit} from '../../../../../../app-toolkit';

@Component({
  selector: 'view-banner-page',
  templateUrl: './basic-section.component.html',
  styleUrls: ['./basic-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerPageTemplate {
  public title: string;
  public subTitles: string[];
}

export abstract class BasicSection {
  @ViewChild('banner', {read: ViewContainerRef})
  private bannerContainerRef: ViewContainerRef;

  private componentFactoryResolver = AppToolkit.getInstance().getComponentFactoryResolver();

  protected constructor() {
    setTimeout(()=> this.createBanner())
  }

  protected abstract getPageTitle(): string;

  protected abstract getPageSubTitle(): string[];

  protected get themeColor(): string{
    return '#e53935';
  }

  private createBanner() {
    const bannerCompRef = this.componentFactoryResolver.resolveComponentFactory(BannerPageTemplate);
    const compRef = this.bannerContainerRef.createComponent(bannerCompRef);
    compRef.instance.title = this.getPageTitle();
    compRef.instance.subTitles = this.getPageSubTitle();
    compRef.changeDetectorRef.detectChanges();
  }
}
