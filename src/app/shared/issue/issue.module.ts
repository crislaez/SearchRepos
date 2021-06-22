import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReposEffects } from './effects/issue.effects';
import * as fromIssue from './reducers';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromIssue.issueKey, fromIssue.reducer),
    EffectsModule.forFeature([ReposEffects])
  ]
})
export class IssueModule {}
