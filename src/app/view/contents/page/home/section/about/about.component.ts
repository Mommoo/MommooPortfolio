import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BasicSection} from '../../common/basic/basic-section.component';
import {ViewportChangeDetector} from './viewport-change-detector';
import {ViewportState} from './types';
import {Skill} from '../../../../../../server/data-types';
import {PromiseDataLoader} from '../../../../../../server/promise-data-loader.service';

@Component({
  selector: 'about-section',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutSection extends BasicSection implements OnInit, OnDestroy {
  private _maxColumnNum = 6;
  private _gutterSize = 20;
  private _cardTextFontSize : string;
  private _skills : Skill[];

  private viewportChangeDetector = new ViewportChangeDetector();

  constructor(private changeDetector: ChangeDetectorRef, private promiseDataLoader : PromiseDataLoader) {
    super();
  }

  private setSkillCardProperty(colNum : number, contentFontSize : string, gutterSize : number) {
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

  public get cardTextFontSize(): string {
    return this._cardTextFontSize;
  }

  get skills(): Skill[] {
    return this._skills;
  }

  public async ngOnInit() {
    this._skills = await this.promiseDataLoader.promiseSkills();
    this.setPropertyChangeListenerAccordingToViewportState();
  }

  private setPropertyChangeListenerAccordingToViewportState(){
    this.viewportChangeDetector.setViewportStatusListener(status=> {
      switch(status) {
        case ViewportState.X_LARGE:
          this.setSkillCardProperty(6, '1vmax', 12);
          break;
        case ViewportState.LARGE:
          this.setSkillCardProperty(5, '1.2max', 10);
          break;
        case ViewportState.X_MEDIUM:
          this.setSkillCardProperty(4, '1.4max', 8);
          break;
        case ViewportState.MEDIUM:
          this.setSkillCardProperty(4, '1.5max', 6);
          break;
        case ViewportState.SMALL:
          this.setSkillCardProperty(2, '2vmax', 4);
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
