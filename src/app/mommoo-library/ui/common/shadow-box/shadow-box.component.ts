import {ChangeDetectionStrategy, Component, Host, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'mommoo-shadow-box',
  templateUrl: './shadow-box.component.html',
  styleUrls: ['./shadow-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooShadowBox implements OnChanges{
  @Input()
  public flat: boolean = false;

  @Input()
  public radius: string = '0px';

  public borderRadius = this.radius;

  public targetClassName = 'shadow-visible-rect';

  ngOnChanges(changes: SimpleChanges): void {
    if ( this.flat ) {
      this.targetClassName = 'flat-visible-rect';
      this.borderRadius = '0px';
    } else {
      this.targetClassName ='shadow-visible-rect';
      this.borderRadius = this.radius;
    }
  }
}
