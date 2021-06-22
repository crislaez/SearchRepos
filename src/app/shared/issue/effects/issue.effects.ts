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
          map(({page, issues, total_pages}) => IssueActions.saveIssues({issues: issues || [], page: page || 1, total_pages: total_pages || 1}) ),
          catchError((error) => {
            console.log(error)
            return [IssueActions.saveIssues({issues: [], page: 1, total_pages: 1}) ]
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
// <https://api.github.com/user/51215457/repos?page=3&per_page=15>; rel="prev",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="next",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="last",
// <https://api.github.com/user/51215457/repos?page=1&per_page=15>; rel="first"


// <https://api.github.com/user/51215457/repos?page=2&per_page=15>; rel="next",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="last"
