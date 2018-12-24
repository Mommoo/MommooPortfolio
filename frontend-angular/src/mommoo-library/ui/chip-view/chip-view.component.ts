import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'mommoo-chip-view',
  templateUrl: './chip-view.component.html',
  styleUrls: ['./chip-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipViewComponent {
  @Input()
  public icon: string;

  public constructor(private sanitizer: DomSanitizer) { }

  public get iconURL() {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.icon})`);
  }
}
