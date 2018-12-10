import {ChangeDetectorRef} from '@angular/core';
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
