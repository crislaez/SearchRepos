import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreConfigService } from '../../../core/services/core-config.service';
import { getResponseInfo } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ReposService {

  baseURL:string = `${this._coreConfig.getEndpoint()}`;
  perPage:string = '15';

  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getRepos(name?:string, page?:string): Observable<any>{
     //'https://api.github.com/users/crislaez/repos?page=2&per_page=100'
     return this.http.get(`${this.baseURL}users/${name}/repos?page=${page}&per_page=${this.perPage}`, {observe: 'response'}).pipe(
      // tap(data => {
      //   // console.log(data)
      //   console.log(data.headers.get('link'))
      // }),
      map(response => ({repos: response?.body || [], page: (getResponseInfo(response.headers.get('link'), 'next', page) -1)|| 1, total_pages: getResponseInfo(response.headers.get('link'), 'last', page) || 1})),
      catchError(error => {
        return throwError(error)
      })
    )
  }


}
