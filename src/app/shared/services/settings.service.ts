import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { distinctUntilChanged,map } from 'rxjs/operators';

import {
  SettingsViewModel
} from './../models';


@Injectable()
export class SettingsService {
  private currentSettingsSubject = new BehaviorSubject<SettingsViewModel>({} as SettingsViewModel);
  public currentSettings = this.currentSettingsSubject.asObservable().pipe(distinctUntilChanged());
  constructor(
    private apiService: ApiService
  ) { }

  GetTimeZones(): Observable<[string, string]> {
    console.log('GetTimeZones()');
    return this.apiService.get('/API/dnn_OpenNewsSPA/Settings/GetTimeZones')
      .pipe(map(data => data));
  }
  GetPortalFolders(): Observable<[string, string]> {
    console.log('GetPortalFolders()');
    return this.apiService.get('/API/dnn_OpenNewsSPA/Settings/GetPortalFolders')
      .pipe(map(data => data));
  }
  GetTemplates(): Observable<[string, string]> {
    console.log('GetTemplates()');
    return this.apiService.get('/API/dnn_OpenNewsSPA/Settings/GetTemplates')
      .pipe(map(data => data));
  }
  GetSettings(): Observable<SettingsViewModel> {
    console.log('GetSettings()');
    return this.apiService.get('/API/dnn_OpenNewsSPA/Settings/GetSettings')
      .pipe(map(data => {
        this.currentSettingsSubject.next(data);
        return data;
      }));
  }
  getCurrentSettings(): SettingsViewModel {
    return this.currentSettingsSubject.value;
  }
  setGlobalSettings(): Promise<any> {
    console.log(`GetSettingsPromise:: before http.get call`);

    const promise = this.apiService.get('/API/dnn_OpenNewsSPA/Settings/GetSettings')
      .toPromise()
      .then(data => {
        this.currentSettingsSubject.next(data);
        return data;
      });

    return promise;
  }

  //GetSettingsPromise(): Promise<any> {
  //  console.log(`GetSettingsPromise:: before http.get call`);

  //  const promise = this.apiService.get('http://localhost/API/dnn_OpenNewsSPA/Settings/GetSettings')
  //    .toPromise()
  //    .then(data => {
  //      console.log(`Settings from API: `, data);
  //      //this.globals.settings = settings;


  //      return data;
  //    });

  //  return promise;
  //}
  UpdateSettings(settings): Observable<SettingsViewModel> {
    console.log('UpdateSettings()');
    return this.apiService.post('/API/dnn_OpenNewsSPA/Settings/UpdateSettings', settings)
      .pipe(map(data => data));
  }

}
