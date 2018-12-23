import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import {WebClient} from '../../../../server/webclient/web-client-types';
import {WebClientDataLoader} from '../../../../server/webclient/web-client-resource.service';
import {ContentsLayoutDetector} from '../../contents-layout-finder.service';
import {AngularUtils} from '../../../../../mommoo-library/util/angular';
import {ContentsItem, ContentsLayout, ContentsLayoutChangeListener} from '../../contents/contents.types';

/**
 * This section class is preparing data about developer mommoo's language technologies.
 * The data will be gathering from server data named 'WebClient'
 * and it is displayed card-view in grid-layout
 *
 * When contents area width resizing, the grid-card-properties are decide automatically relative to container width
 * {@link setProperGridCardProperty}, {@link ContentsLayoutDetector}
 */

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, OnDestroy {
  private static readonly preferredMaxCardSize = 240;
  private static readonly preferredMinCardSize = 200;
  private static readonly cardFontRatio = 0.1;
  private static readonly preferredCardGutterSize = 10;

  private gridCardProperty = {
    numberOfCard: -1,
    gridGutterSize: AboutComponent.preferredCardGutterSize,
    cardTextFondSize: 20
  };

  private _languageTechs: WebClient.Introduction.LanguageTech[];

  @ViewChild('cardParent', {read: ElementRef})
  private cardParentElementRef: ElementRef<HTMLElement>;

  private cardLayoutChangeEventID: string;

  constructor(private changeDetector: ChangeDetectorRef,
              private webClientDataLoader: WebClientDataLoader,
              private contentsViewportHandler: ContentsLayoutDetector) {

    this.changeDetector = AngularUtils.createAsyncChangeDetectorRef(changeDetector);
  }

  private subscribeCardLayoutChangeEvent(): string {
    const preferredItem: ContentsItem = {
      preferredWidth: AboutComponent.preferredMaxCardSize,
      minWidth: AboutComponent.preferredMinCardSize
    };

    const contentsLayoutChangeListener: ContentsLayoutChangeListener
      = properContentsLayout => this.setProperGridCardProperty(properContentsLayout);

    return this.contentsViewportHandler
      .subscribe(preferredItem, contentsLayoutChangeListener);
  }

  private setProperGridCardProperty(properContentsLayout: ContentsLayout) {
    const [cardNum, cardSize] = properContentsLayout.values();

    this.gridCardProperty.numberOfCard = cardNum;
    this.gridCardProperty.cardTextFondSize = cardSize * AboutComponent.cardFontRatio;
    this.gridCardProperty.gridGutterSize = AboutComponent.preferredCardGutterSize;
    this.changeDetector.detectChanges();
  }

  public async ngOnInit() {
    this._languageTechs
      = await this.webClientDataLoader
      .introductionLoader
      .getLanguageTechsAsync();

    this.cardLayoutChangeEventID = this.subscribeCardLayoutChangeEvent();
  }

  public ngOnDestroy(): void {
    this.contentsViewportHandler.unSubscribe(this.cardLayoutChangeEventID);
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

  protected get bannerDescriptions(): string[] {
    return ['2014년부터 개발 공부를 시작했습니다.',
      '이론과 실습을 계속 병행하며, 꾸준히 실력을 쌓아 왔습니다.',
      '개발 철학은 "그냥 넘어가지 말자" 입니다.',
      '개인 프로젝트를 진행하다가, 궁금한 것이 나오면 꼭 해결을 하고 넘어갔습니다.',
      '이러한 개발 철학을 바탕으로, 프로그래밍 기본기를 단단하게 쌓았습니다.',
      '아래의 리스트는 제가 개발 가능한 언어와 환경을 나타냈습니다.'];
  }

  protected get bannerTitle(): string {
    return 'ABOUT-ME';
  }
}
