import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReposEffects } from './effects/repos.effects';
import * as fromRepos from './reducers';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromRepos.reposKey, fromRepos.reducer),
    EffectsModule.forFeature([ReposEffects])
  ]
})
export class ReposModule {}
