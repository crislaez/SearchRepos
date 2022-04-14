import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GenericsModule } from '@clrepos/shared-ui/generics/generics.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommentModule } from '../shared/comment/comment.module';
import { CommentsPageRoutingModule } from './comments-routing.module';
import { CommentsPage } from './containers/comments.page';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CommentModule,
    GenericsModule,
    TranslateModule.forChild(),
    CommentsPageRoutingModule
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule {}
