import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscribersPage } from './containers/subscribers.page';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:':repoName',
        component: SubscribersPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribersPageRoutingModule {}
