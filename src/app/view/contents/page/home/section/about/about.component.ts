import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BasicSectionComponent} from '../../common/basic/basic-section.component';
import {DataLoaderService} from '../../../../../../data/http/data-loader.service';
import {Skill} from '../../../../../../data/http/http-data-structure';
import {ViewportChangeDetector} from './viewport-change-detector';
import {ViewportState} from './types';

@Component({
  selector: 'view-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BasicSectionComponent implements OnInit, OnDestroy {
  private _maxColumnNum = 6;
  private _gutterSize = 20;
  private _hashTagFontType ='NotoSans-Thin, sans-serif';
  private _cardTextFontSize : string;
  private _skills : Skill[];

  private viewportChangeDetector = new ViewportChangeDetector();

  constructor(private changeDetector: ChangeDetectorRef, private httpDataLoader : DataLoaderService) {
    super();
  }

  private setProperty(colNum : number, contentFontSize : string, gutterSize : number) {
    this._maxColumnNum = colNum;
    this._cardTextFontSize = contentFontSize;
    this._gutterSize = gutterSize;
    this.changeDetector.detectChanges();
  }

  public get maxColumnNum(): number {
    return this._maxColumnNum;
  }

  public get gutterSize(): number {
    return this._gutterSize;
  }

  public get hashTagFontType(): string {
    return this._hashTagFontType;
  }

  public get cardTextFontSize(): string {
    return this._cardTextFontSize;
  }

  get skills(): Skill[] {
    return this._skills;
  }

  ngOnInit(): void {
    this.httpDataLoader.getSkills().subscribe(skills=> this.buildAboutPage(skills));
  }

  private buildAboutPage(skills: Skill[]) {
    this._skills = skills;
    this.setPropertyChangeListenerAccordingToViewportState();
    console.log('foo!');
  }

  private setPropertyChangeListenerAccordingToViewportState(){
    this.viewportChangeDetector.setViewportStatusListener(status=> {
      switch(status) {
        case ViewportState.X_LARGE:
          this.setProperty(6, '1vmax', 12);
          break;
        case ViewportState.LARGE:
          this.setProperty(5, '1.2max', 10);
          break;
        case ViewportState.X_MEDIUM:
          this.setProperty(4, '1.4max', 8);
          break;
        case ViewportState.MEDIUM:
          this.setProperty(4, '1.5max', 6);
          break;
        case ViewportState.SMALL:
          this.setProperty(2, '2vmax', 4);
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.viewportChangeDetector.clear();
  }

  protected getPageSubTitle(): string[] {
    return ['2014년부터 개발 공부를 시작했습니다.',
      '이론과 실습을 계속 병행하며, 꾸준히 실력을 쌓아 왔습니다.',
    '개발 철학은 "그냥 넘어가지 말자" 입니다.',
    '개인 프로젝트를 진행하다가, 궁금한 것이 나오면 꼭 해결을 하고 넘어갔습니다.',
    '이러한 개발 철학을 바탕으로, 프로그래밍 기본기를 단단하게 쌓았습니다.',
    '아래의 리스트는 제가 개발 가능한 언어와 환경을 나타냈습니다.'];
  }

  protected getPageTitle(): string {
    return "ABOUT-ME";
  }
}
