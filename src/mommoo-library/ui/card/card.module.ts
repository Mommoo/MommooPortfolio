import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooCard} from './card.component';
import {MommooCommonModule} from '../common/common.module';
import {MommooButtonModule} from '../button/button.module';
import {
  MommooCardAction, MommooCardActionButton,
  MommooCardContents,
  MommooCardHashTag,
  MommooCardHashTagContents, MommooCardImage,
  MommooCardTitle, MommooCardViewport
} from './card-contents.component';
import {CardImageAnimator} from './card-image-animator';

@NgModule({
  imports: [
    CommonModule,
    MommooCommonModule,
    MommooButtonModule
  ],
  exports : [
    MommooCard,
    MommooCardViewport,
    MommooCardTitle,
    MommooCardImage,
    MommooCardContents,
    MommooCardHashTag,
    MommooCardHashTagContents,
    MommooCardAction,
    MommooCardActionButton
  ],
  providers : [
    CardImageAnimator
  ],
  declarations: [
    MommooCard,
    MommooCardViewport,
    MommooCardTitle,
    MommooCardImage,
    MommooCardContents,
    MommooCardHashTag,
    MommooCardHashTagContents,
    MommooCardAction,
    MommooCardActionButton
  ]
})
export class MommooCardModule { }
