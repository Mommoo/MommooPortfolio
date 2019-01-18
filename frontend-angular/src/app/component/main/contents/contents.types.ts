import {ElementRef} from '@angular/core';

export interface ContentsSection {
  readonly menuName: string;
  readonly elementRef: ElementRef<HTMLElement>;
}
