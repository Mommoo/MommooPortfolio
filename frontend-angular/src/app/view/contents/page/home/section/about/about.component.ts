import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {BannerSection} from '../../common/banner-section/banner-section.component';

import {AngularUtils} from '../../../../../../../mommoo-library/util/angular';
import {WebClientDataLoader} from '../../../../../../server/webclient/web-client-resource.service';
import {WebClient} from '../../../../../../server/webclient/web-client-types';
import {WindowSizeEventHandler} from '../../../../../../../mommoo-library/handler/window/size/window-size-handler';
import {GridCardProperty} from './about.types';

/**
 * This section class is preparing data about developer mommoo's language technologies.
 * The data will be gathering from server data named 'WebClient'
 * and it is displayed card-view in grid-layout
 *
 * When window resizing, the grid-card-properties are decide automatically relative to container width
 * {@link setProperGridCardProperty}
 */
@Component({
  selector: 'about-section',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutSection extends BannerSection implements OnInit, OnDestroy {
  private static readonly preferredMinCardSize = 200;
  private static readonly preferredMaxCardSize = 220;
  private static readonly preferredCardGutterSize = 10;
  private static readonly cardFontRatio = 0.1;

  private gridCardProperty: GridCardProperty = {
    numberOfCard: -1,
    gridGutterSize: 20,
    cardTextFondSize: 20
  };

  private _languageTechs: WebClient.Introduction.LanguageTech[];

  @ViewChild('cardParent', {read: ElementRef})
  private cardParentElementRef: ElementRef<HTMLElement>;

  private resizingEventID: string;

  constructor(private changeDetector: ChangeDetectorRef, private webClientDataLoader: WebClientDataLoader) {
    super();
    this.changeDetector = AngularUtils.createAsyncChangeDetectorRef(changeDetector);
  }

  /**
   * @description: proper card properties are calculated
   * according to the width of grid-container {@link cardParentElementRef}
   *
   * @param containerWidth: grid-card container's width
   *
   * @return [proper number of card, proper size of card]
   */
  private static calculateProperCardProperties(containerWidth: number): [number, number] {
    let cardNum;
    let cardSize;

    let count = 1;
    while (true) {
      const expectCardSize = containerWidth / count;
      if (expectCardSize > AboutSection.preferredMaxCardSize) {
        count++;
        continue;
      }

      if (count !== 1) {
        const previousExpectCardSize = containerWidth / (count - 1);
        const previousSub = previousExpectCardSize - AboutSection.preferredMaxCardSize;
        const currentSub = AboutSection.preferredMaxCardSize - expectCardSize;

        const isLongerOneNearPreferred = previousSub - currentSub;
        /** Even though the current one closer to preferred max card width than longer one,
         * if card size is shorter than preferred min value,
         * we choice longer one not current one */
        const isTooShortNotThinkNear = expectCardSize < AboutSection.preferredMinCardSize;

        if (isLongerOneNearPreferred || isTooShortNotThinkNear) {
          cardNum = count - 1;
          cardSize = previousExpectCardSize;
          break;
        }
      }

      cardNum = count;
      cardSize = expectCardSize;

      break;
    }

    return [cardNum, cardSize];
  }

  private setProperGridCardProperty() {
    const gridContainerWidth = this.cardParentElementRef.nativeElement.offsetWidth;
    const [cardNum, cardSize] = AboutSection.calculateProperCardProperties(gridContainerWidth);

    if (this.gridCardProperty.numberOfCard !== cardNum) {
      this.gridCardProperty.numberOfCard = cardNum;
      this.gridCardProperty.cardTextFondSize = cardSize * AboutSection.cardFontRatio;
      this.gridCardProperty.gridGutterSize
        = Math.max(gridContainerWidth - (cardSize * cardNum), AboutSection.preferredCardGutterSize);
      this.changeDetector.detectChanges();
    }
  }

  public async ngOnInit() {
    this._languageTechs
      = await this.webClientDataLoader
      .introductionLoader
      .getLanguageTechsAsync();

    this.resizingEventID
      = WindowSizeEventHandler.addResizingEvent(() => this.setProperGridCardProperty(), true);
  }

  public ngOnDestroy(): void {
    WindowSizeEventHandler.removeEvent(this.resizingEventID);
  }

  public get maxColumnNum(): number {
    return this.gridCardProperty.numberOfCard;
  }

  public get gutterSize(): number {
    return this.gridCardProperty.gridGutterSize;
  }

  public get cardTextFontSize(): string {
    return `${this.gridCardProperty.cardTextFondSize}px`;
  }

  public get languageTechs() {
    return this._languageTechs;
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
    return 'ABOUT-ME';
  }
}
