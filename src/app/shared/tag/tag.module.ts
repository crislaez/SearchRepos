import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TagsEffects } from './effects/tag.effects';
import * as fromTag from './reducers/tag.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromTag.tagFeatureKey, fromTag.reducer),
    EffectsModule.forFeature([TagsEffects])
  ]
})
export class TagModule {}
