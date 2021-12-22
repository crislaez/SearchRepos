import { Injectable } from '@angular/core';
import { NotificationActions } from '@clrepos/shared/notification';
import { EntityStatus } from '@clrepos/shared/utils/utils/functions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TagActions from '../actions/tag.actions';
import { TagService } from '../services/tag.service';

@Injectable()
export class TagsEffects {

  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagActions.loadTags),
      switchMap(({userName, repoName, page}) =>
        this._tag.getTags(userName, repoName, page).pipe(
          map(({page, tags, total_pages}) => TagActions.saveTags({repoName, tags: tags || [], page: page || 1, total_pages: total_pages || 1, status: EntityStatus.Loaded }) ),
          catchError((error) => {
            return of(
              TagActions.saveTags({repoName, tags: [], page: 1, total_pages: 1, status: EntityStatus.Error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TAGS'})
            )
          })
        )
      )
    )
  );


  constructor(
    private _tag: TagService,
    private actions$: Actions
  ){ }

}

