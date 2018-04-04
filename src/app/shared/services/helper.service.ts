import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

import {
  UserViewModel
} from './../models';
import { FileUploadModel, FileViewModel } from '../index';
import { SettingsService } from './settings.service';

@Injectable()
export class HelperService {
  constructor(
    private apiService: ApiService,
    private settingsService: SettingsService
  ) { }


  cleanUrl(url): Observable<string> {
    console.log('cleanUrl()');
    return this.apiService.post('/API/dnn_OpenNewsSPA/Helper/CleanUrl', { url: url })
      .pipe(map(data => {
        return data;
      }));
  }

  
  getAuthors(inRole): Observable<UserViewModel[]> {
    console.log('GetAll getAuthors()');
    return this.apiService.post('/API/dnn_OpenNewsSPA/User/GetList', { inRole: inRole})
      .pipe(map(data => {
        return data;
      }));
  }

  getNaModules(): Observable<any> {
    console.log('GetAll getAuthors()');
    return this.apiService.post('/API/dnn_OpenNewsSPA/Helper/GetNAModules')
      .pipe(map(data => {
        return data;
      }));
  }

  importModule(naModeulId): Observable<any> {
    console.log('importModule()');
    return this.apiService.post('/API/dnn_OpenNewsSPA/Helper/ImportFromNAModule', { naModeulId: naModeulId, oaModeulId: -1 })
      .pipe(map(data => {
        return data;
      }));
  }
}
