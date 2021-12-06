import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserNameGuard } from '@clrepos/shared/repos';

const routes: Routes = [
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'issues',
    loadChildren: () => import('./issues/issues.module').then( m => m.IssuesPageModule),
    canLoad: [UserNameGuard]
  },
  {
    path: 'comments',
    loadChildren: () => import('./comments/comments.module').then( m => m.CommentsPageModule),
    canLoad: [UserNameGuard]
  },
  {
    path: 'tags',
    loadChildren: () => import('./tags/tags.module').then( m => m.TagsPageModule),
    canLoad: [UserNameGuard]
  },
  {
    path: 'subscribers',
    loadChildren: () => import('./subscribers/subscribers.module').then( m => m.SubscribersPageModule),
    canLoad: [UserNameGuard]
  },
  {
    path: '**',
    redirectTo: 'search',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
