import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CoreConfigService } from '../../../core/services/core-config.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseURL:string = `${this._coreConfig.getEndpoint()}`;
  perPage:string = '100';


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getComment(userName?:string, repoName?:string, issueNumber?:string,  page?:string): Observable<any>{
     return this.http.get(`${this.baseURL}repos/${userName}/${repoName}/issues/${issueNumber}/comments?page=${page}&per_page=${this.perPage}`, {observe: 'response'}).pipe(
      map(response => ({comment: response?.body || []})),
      catchError(error => {
        return throwError(error)
      })
    )
  }

}
