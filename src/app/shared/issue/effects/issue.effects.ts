import { Injectable } from '@angular/core';
import { NotificationActions } from '@clrepos/shared/notification';
import { EntityStatus } from '@clrepos/shared/utils/utils/functions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as IssueActions from '../actions/issue.actions';
import { IssueService } from '../services/issue.service';


@Injectable()
export class ReposEffects {

  loadRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssueActions.loadIssues),
      switchMap(({userName, repoName, page}) =>
        this._issue.getIssues(userName, repoName, page).pipe(
          map(({page, issues, total_pages}) => IssueActions.saveIssues({repoName, issues: issues || [], page: page || 1, total_pages: total_pages || 1, status: EntityStatus.Loaded }) ),
          catchError((error) => {
            return of(
              IssueActions.saveIssues({repoName, issues: [], page: 1, total_pages: 1, status: EntityStatus.Error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_ISSUES'})
            )
          })
        )
      )
    )
  );


  constructor(
    private _issue: IssueService,
    private actions$: Actions
  ){ }

}
