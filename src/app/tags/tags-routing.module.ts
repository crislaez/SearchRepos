import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsPage } from './containers/tags.page';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:':repoName',
        component: TagsPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsPageRoutingModule {}
