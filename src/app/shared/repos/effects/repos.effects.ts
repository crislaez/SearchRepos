import { Injectable } from '@angular/core';
import { NotificationActions } from '@clrepos/shared/notification';
import { EntityStatus } from '@clrepos/shared/shared/utils/utils';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ReposActions from '../actions/repos.actions';
import { ReposService } from '../services/repos.service';

@Injectable()
export class ReposEffects {


  loadRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReposActions.loadRepos),
      switchMap(({name, page}) =>
        this._repos.getRepos(name, page).pipe(
          map(({page, repos, total_pages}) => ReposActions.saveRepos({usserName:name, repos, page, total_pages, status: EntityStatus.Loaded }) ),
          catchError((error) => {
            return of(
              ReposActions.saveRepos({usserName:name, repos: [], page: 1, total_pages: 0,  status: EntityStatus.Error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_REPOS'})
            )
          })
        )
      )
    )
  );


  constructor(
    private _repos: ReposService,
    private actions$: Actions
  ){ }


}

