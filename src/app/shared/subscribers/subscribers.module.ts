import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SubscriberEffects } from './effects/subscriber.effects';
import * as fromSubscriber from './reducers/subscriber.reducer';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromSubscriber.subscriberFeatureKey, fromSubscriber.reducer),
    EffectsModule.forFeature([SubscriberEffects])
  ]
})
export class SubscriberModule {}
