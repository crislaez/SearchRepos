import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { CommentEffects } from './effects/comment.effects';
import * as fromComment from './reducers/comment.reducer';


@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromComment.commentFeatureKey, fromComment.reducer),
    EffectsModule.forFeature([CommentEffects])
  ]
})
export class CommentModule {}
