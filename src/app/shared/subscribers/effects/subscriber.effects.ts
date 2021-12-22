import { Injectable } from '@angular/core';
import { NotificationActions } from '@clrepos/shared/notification';
import { EntityStatus } from '@clrepos/shared/utils/utils/functions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as SubscriberActions from '../actions/subscriber.actions';
import { SubscriberService } from '../services/subscriber.service';

@Injectable()
export class SubscriberEffects {


  loadSubscribers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriberActions.loadSubscribers),
      switchMap(({userName, repoName, page}) =>
        this._subscriber.getSubscribers(userName, repoName, page).pipe(
          map(({page, subscribers, total_pages}) => SubscriberActions.saveSubscribers({repoName, subscribers: subscribers || [], page: page || 1, total_pages: total_pages || 1, status: EntityStatus.Loaded }) ),
          catchError((error) => {
            return of(
              SubscriberActions.saveSubscribers({repoName, subscribers: [], page: 1, total_pages: 1, status: EntityStatus.Error}),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_SUBSCRIBERS'})
            )
          })
        )
      )
    )
  );


  constructor(
    private _subscriber: SubscriberService,
    private actions$: Actions
  ){ }


}

