import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CoreConfigService } from '../../../core/services/core-config.service';
import { catchError, map, tap } from 'rxjs/operators';
import { getResponseInfo } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  baseURL:string = `${this._coreConfig.getEndpoint()}`;
  perPage:string = '15';


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getTags(userName?:string, repoName?:string, page?:string): Observable<any>{
    return this.http.get(`${this.baseURL}repos/${userName}/${repoName}/tags?page=${page}&per_page=${this.perPage}`, {observe: 'response'}).pipe(
      map(response => ({tags: response?.body || [], page: (getResponseInfo(response.headers.get('link'), 'next', page) -1)|| 1, total_pages: getResponseInfo(response.headers.get('link'), 'last', page) || 1})),
      catchError(error => {
        return throwError(error)
      })
    )
  }


}
