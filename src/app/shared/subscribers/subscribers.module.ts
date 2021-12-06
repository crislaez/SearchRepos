import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { SubscriberEffects } from './effects/subscriber.effects';
import * as fromSubscriber from './reducers/subscriber.reducer';

@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromSubscriber.subscriberFeatureKey, fromSubscriber.reducer),
    EffectsModule.forFeature([SubscriberEffects])
  ]
})
export class SubscriberModule {}
