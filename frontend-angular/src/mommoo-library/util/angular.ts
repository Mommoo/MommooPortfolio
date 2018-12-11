import {ChangeDetectorRef, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

export class AngularUtils {
  public static createAsyncChangeDetectorRef(changeDetectorRef: ChangeDetectorRef) {
    const originalDetectChanges = changeDetectorRef['detectChanges'];

    changeDetectorRef['detectChanges'] = function() {
      if (!changeDetectorRef['destroyed']) {
        originalDetectChanges.apply(this);
      }
    };

    return changeDetectorRef;
  }
}

export function MultiViewChild(selector, opts: { read: any[] }) {
  const tokens = opts.read;
  const decs = tokens.map(x => ViewChild(selector, { read: x }));

  return function(target: any, name: string) {
    decs.forEach((d, i) => d(target, `${name}_${i}`));
    Object.defineProperty(target, name, {
      get: function() {
        return decs.map((x, i) =>  this[`${name}_${i}`], this);
      }
    });
  };
}
