import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ReposActions } from '../actions';
import { ReposService } from '../services/repos.service';


@Injectable()
export class ReposEffects {


  loadRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReposActions.loadRepos),
      switchMap(({name, page}) =>
        this._repos.getRepos(name, page).pipe(
          map(({page, repos, total_pages}) => ReposActions.saveRepos({usserName:name, repos: repos || [], page: page || 1, total_pages: total_pages || 1}) ),
          catchError((error) => {
            console.log(error)
            return [ReposActions.saveRepos({usserName:name, repos: [], page: 1, total_pages: 1}) ]
          })
        )
      )
    )
  );

  // loadReposInit$ = createEffect(() =>
  //   of(ReposActions.loadRepos({name: 'CrisLaez', page: '1'}))
  // );

  constructor(private _repos: ReposService, private actions$: Actions){}
}
// <https://api.github.com/user/51215457/repos?page=3&per_page=15>; rel="prev",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="next",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="last",
// <https://api.github.com/user/51215457/repos?page=1&per_page=15>; rel="first"


// <https://api.github.com/user/51215457/repos?page=2&per_page=15>; rel="next",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="last"
