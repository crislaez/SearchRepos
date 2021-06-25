import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { TagActions } from '../actions';
import { TagService } from '../services/tag.service';


@Injectable()
export class TagsEffects {


  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.loadTags),
      switchMap(({userName, repoName, page}) =>
        this._tag.getTags(userName, repoName, page).pipe(
          tap(({page, tags, total_pages}) => console.log(tags)),
          map(({page, tags, total_pages}) => TagActions.saveTags({repoName, tags: tags || [], page: page || 1, total_pages: total_pages || 1}) ),
          catchError((error) => {
            console.log(error)
            return [TagActions.saveTags({repoName, tags: [], page: 1, total_pages: 1}) ]
          })
        )
      )
    )
  );

  // loadReposInit$ = createEffect(() =>
  //   of(TagActions.loadRepos({name: 'CrisLaez', page: '1'}))
  // );

  constructor(private _tag: TagService, private actions$: Actions){}
}
// <https://api.github.com/user/51215457/repos?page=3&per_page=15>; rel="prev",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="next",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="last",
// <https://api.github.com/user/51215457/repos?page=1&per_page=15>; rel="first"


// <https://api.github.com/user/51215457/repos?page=2&per_page=15>; rel="next",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="last"
