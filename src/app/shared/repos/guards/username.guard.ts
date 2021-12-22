import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { EntityStatus } from '@clrepos/shared/utils/utils/functions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map, take, withLatestFrom } from 'rxjs/operators';
import * as fromRepos from '../selectors/repos.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserNameGuard implements CanLoad {

  constructor(private router: Router, private store: Store) { }

  canLoad(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(fromRepos.getStatus),
      first(status => status === EntityStatus.Loaded || status === EntityStatus.Initial),
      withLatestFrom(
        this.store.pipe(select(fromRepos.getUserName)),
      ),
      map(([_, userName]) => (!!userName ? true : this.router.parseUrl('/search'))),
      take(1)
    );
  };

}
