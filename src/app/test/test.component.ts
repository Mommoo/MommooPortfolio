import {ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit, OnChanges, DoCheck {

  @Input()
  public value = [1,2,3,4,5,6,8,9,10];

  private _value;

  constructor() { }

  set testValue(value) {
    this._value = value;
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    console.log('doCheck!!');
    console.log(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
