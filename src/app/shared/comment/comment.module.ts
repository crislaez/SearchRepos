import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommentEffects } from './effects/comment.effects';
import * as fromComment from './reducers';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromComment.commentKey, fromComment.reducer),
    EffectsModule.forFeature([CommentEffects])
  ]
})
export class CommentPageModule {}