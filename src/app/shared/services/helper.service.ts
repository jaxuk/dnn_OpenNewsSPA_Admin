import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

import {
  UserViewModel,
  RoleViewModel
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

  
  getAuthors(): Observable<UserViewModel[]> {
    console.log('GetAll getAuthors()');
    return this.apiService.post('/API/dnn_OpenNewsSPA/User/GetAuthorList')
      .pipe(map(data => {
        return data;
      }));
  }

  getRoles(): Observable<string[]> {
    console.log('GetAll getAuthors()');
    return this.apiService.post('/API/dnn_OpenNewsSPA/Role/GetList')
      .pipe(map(data => {
        return data;
      }));
  }

  getNaModules(): Observable<any> {
    console.log('GetAll GetNAModules()');
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
