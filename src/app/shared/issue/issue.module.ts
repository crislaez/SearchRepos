import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotificationModule } from '../notification/notification.module';
import { ReposEffects } from './effects/issue.effects';
import * as fromIssue from './reducers/issue.reducer';

@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromIssue.issueFeatureKey, fromIssue.reducer),
    EffectsModule.forFeature([ReposEffects])
  ]
})
export class IssueModule {}
