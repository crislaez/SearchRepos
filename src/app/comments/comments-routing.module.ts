import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentsPage } from './containers/comments.page';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:':issueNumber',
        component: CommentsPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentsPageRoutingModule {}
