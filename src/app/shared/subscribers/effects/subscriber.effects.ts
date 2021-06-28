import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { SubscriberActions } from '../actions';
import { SubscriberService } from '../services/subscriber.service';


@Injectable()
export class SubscriberEffects {


  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriberActions.loadSubscribers),
      switchMap(({userName, repoName, page}) =>
        this._subscriber.getSubscribers(userName, repoName, page).pipe(
          // tap(({page, subscribers, total_pages}) => console.log(subscribers)),
          map(({page, subscribers, total_pages}) => SubscriberActions.saveSubscribers({repoName, subscribers: subscribers || [], page: page || 1, total_pages: total_pages || 1}) ),
          catchError((error) => {
            console.log(error)
            return [SubscriberActions.saveSubscribers({repoName, subscribers: [], page: 1, total_pages: 1}) ]
          })
        )
      )
    )
  );

  // loadReposInit$ = createEffect(() =>
  //   of(SubscriberActions.loadRepos({name: 'CrisLaez', page: '1'}))
  // );

  constructor(private _subscriber: SubscriberService, private actions$: Actions){}
}
// <https://api.github.com/user/51215457/repos?page=3&per_page=15>; rel="prev",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="next",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="last",
// <https://api.github.com/user/51215457/repos?page=1&per_page=15>; rel="first"


// <https://api.github.com/user/51215457/repos?page=2&per_page=15>; rel="next",
// <https://api.github.com/user/51215457/repos?page=5&per_page=15>; rel="last"
