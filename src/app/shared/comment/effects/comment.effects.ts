import { Injectable } from '@angular/core';
import { NotificationActions } from '@clrepos/shared/notification';
import { EntityStatus } from '@clrepos/shared/utils/utils/functions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as CommentActions from '../actions/comment.actions';
import { CommentService } from '../services/comment.service';


@Injectable()
export class CommentEffects {


  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.loadComments),
      switchMap(({userName, repoName, issueNumber, page}) =>
        this._comment.getComment(userName, repoName, issueNumber, page).pipe(
          map(({comment}) => CommentActions.saveComments({ comment: comment || [], status: EntityStatus.Loaded })),
          catchError((error) => {
            return of(
              CommentActions.saveComments({ comment: [], status: EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_COMMENTS'})
            );
          })
        )
      )
    )
  );



  constructor(
    private _comment: CommentService,
    private actions$: Actions
  ){ }


}
