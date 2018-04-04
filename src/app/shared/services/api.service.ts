import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { ProgressHttp } from "angular-progress-http";
import { Observable } from 'rxjs/Observable';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';
import { FileUploadModel } from '../index';
import { SettingsService } from './settings.service';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private progressHttp: ProgressHttp
  ) { }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return new ErrorObservable(error.json());
  }

  upload(path: string, f: FileUploadModel, uploadFolder: string) {
    let form = new FormData();
    form.append("POSTFILE", f.file);
    form.append("OVERWRITE", 'false');
    form.append("FOLDER", uploadFolder);

    return this.progressHttp
      .withUploadProgressListener(progress => { f.percentage = progress.percentage; })
      .post(`${environment.api_url}${path}`,form).pipe(catchError(this.formatErrors));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    ).pipe(catchError(this.formatErrors));
  }
}
