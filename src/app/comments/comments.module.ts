import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommentModule } from '../shared/comment/comment.module';
import { CommentsPageRoutingModule } from './comments-routing.module';
import { CommentsPage } from './containers/comments.page';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    // FormsModule,
    CommentModule,
    TranslateModule.forChild(),
    CommentsPageRoutingModule
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule {}
