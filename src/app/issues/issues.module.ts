import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IssueModule } from '../shared/issue/issue.module';
import { IssuesPage } from './containers/issues.page';
import { IssuesPageRoutingModule } from './issues-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    // FormsModule,
    IssueModule,
    TranslateModule.forChild(),
    IssuesPageRoutingModule
  ],
  declarations: [IssuesPage]
})
export class IssuesPageModule {}
