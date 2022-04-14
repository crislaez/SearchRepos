import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CoreConfigService } from '../../../core/services/core-config.service';
import { getResponseInfo } from '../../utils/utils/functions';

@Injectable({
  providedIn: 'root'
})
export class ReposService {

  baseURL:string = `${this._coreConfig.getEndpoint()}`;
  perPage:string = '15';


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getRepos(name?:string, page?:string): Observable<any>{

     return this.http.get(`${this.baseURL}users/${name}/repos?page=${page}&per_page=${this.perPage}&sort=created`, {observe: 'response'}).pipe(
      map(response => ({repos: response?.body || [], page: (getResponseInfo(response.headers.get('link'), 'next', page) -1)|| 1, total_pages: getResponseInfo(response.headers.get('link'), 'last', page) || 1})),
      catchError(error => {
        return throwError(error)
      })
    )
  }


}
