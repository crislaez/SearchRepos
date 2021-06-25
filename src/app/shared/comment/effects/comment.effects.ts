import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CommentActions } from '../actions';
import { CommentService } from '../services/comment.service';


@Injectable()
export class CommentEffects {


  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.loadComments),
      switchMap(({userName, repoName, issueNumber, page}) =>
        this._comment.getComment(userName, repoName, issueNumber, page).pipe(
          map(({comment}) => CommentActions.saveComments({comment: comment || [], page: Number(page) }) ),
          catchError((error) => {
            console.log(error)
            return [CommentActions.saveComments({comment: [], page: 1}) ]
          })
        )
      )
    )
  );

  // loadReposInit$ = createEffect(() =>
  //   of(CommentActions.loadRepos({name: 'CrisLaez', page: '1'}))
  // );

  constructor(private _comment: CommentService, private actions$: Actions){}
}
// <https://api.github.com/user/51215457/repos?page=3&per_page=15>; rel="prev",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="next",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="last",
// <https://api.github.com/user/51215457/repos?page=1&per_page=15>; rel="first"


// <https://api.github.com/user/51215457/repos?page=2&per_page=15>; rel="next",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="last"
