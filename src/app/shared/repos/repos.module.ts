import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationModule } from '@clrepos/shared/notification/notification.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReposEffects } from './effects/repos.effects';
import * as fromRepos from './reducers/repos.reducer';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    NotificationModule,
    StoreModule.forFeature(fromRepos.reposFeatureKey, fromRepos.reducer),
    EffectsModule.forFeature([ReposEffects])
  ]
})
export class ReposModule {}
