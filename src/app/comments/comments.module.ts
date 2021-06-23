import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommentPageModule } from '../shared/comment/comment.module';
import { IssueModule } from '../shared/issue/issue.module';
import { ReposModule } from '../shared/repos/repos.module';
import { CommentsPageRoutingModule } from './comments-routing.module';
import { CommentsPage } from './containers/comments.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsPageRoutingModule,
    TranslateModule.forChild(),
    IssueModule,
    ReposModule,
    CommentPageModule
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule {}
