import {Component, Input} from '@angular/core';

export interface StyledTextContent {
  text  : string,
  style : object
}

@Component({
  selector: 'common-styled-text-content-container',
  template: ''
})
export class StyledTextContentContainer {

  @Input() protected textContents : string[]  = [];
  @Input() protected contentStyles : object[] = [];

  protected computeStyledTextContents() : StyledTextContent[] {
    this.buildProperInputValue();
    let maxLen = Math.max(this.textContents.length, this.contentStyles.length);
    const styledTextContents : StyledTextContent[] = [];
    for ( let index = 0 ; index < maxLen ; index ++ ) {
      styledTextContents.push({
        text  : this.textContents[index] || '',
        style : this.contentStyles[index] || {}
      })
    }

    return styledTextContents;
  }

  protected isExistContents() : boolean {
    this.buildProperInputValue();
    return this.textContents.length > 0 || this.contentStyles.length >0;
  }

  private buildProperInputValue() {
    if ( !this.textContents ) {
      this.textContents = [];
    }

    if ( !this.contentStyles ) {
      this.contentStyles = [];
    }
  }
}
