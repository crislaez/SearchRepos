import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IssueActions } from '../actions';
import { IssueService } from '../services/issue.service';


@Injectable()
export class ReposEffects {


  loadRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssueActions.loadIssues),
      switchMap(({userName, repoName, page}) =>
        this._issue.getIssues(userName, repoName, page).pipe(
          map(({page, issues, total_pages}) => IssueActions.saveIssues({repoName, issues: issues || [], page: page || 1, total_pages: total_pages || 1}) ),
          catchError((error) => {
            console.log(error)
            return [IssueActions.saveIssues({repoName, issues: [], page: 1, total_pages: 1}) ]
          })
        )
      )
    )
  );

  // loadReposInit$ = createEffect(() =>
  //   of(IssueActions.loadRepos({name: 'CrisLaez', page: '1'}))
  // );

  constructor(private _issue: IssueService, private actions$: Actions){}
}
