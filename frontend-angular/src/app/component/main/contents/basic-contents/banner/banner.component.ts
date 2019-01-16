import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {

  @Input()
  private title: string;

  @Input()
  private descriptions: string[];

  public get properties() {
    return {
      title: this.title,
      descriptions: this.descriptions
    };
  }
}
