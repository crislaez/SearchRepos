import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IssueModule } from '../shared/issue/issue.module';
import { ReposModule } from '../shared/repos/repos.module';
import { IssuesPage } from './containers/issues.page';
import { IssuesPageRoutingModule } from './issues-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssuesPageRoutingModule,
    TranslateModule.forChild(),
    ReposModule,
    IssueModule
  ],
  declarations: [IssuesPage]
})
export class IssuesPageModule {}
