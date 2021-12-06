import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { TagsEffects } from './effects/tag.effects';
import * as fromTag from './reducers/tag.reducer';

@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromTag.tagFeatureKey, fromTag.reducer),
    EffectsModule.forFeature([TagsEffects])
  ]
})
export class TagModule {}
