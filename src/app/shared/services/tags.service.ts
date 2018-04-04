import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

import {
  TagViewModel
} from './../models';


@Injectable()
export class TagsService {
  constructor(
    private apiService: ApiService
  ) { }

  Get(id): Observable<TagViewModel[]> {
    return this.apiService.get('/API/dnn_OpenNewsSPA/Tags/Get', id)
      .pipe(map(data => {
        return data;
      }));
  }

  GetAll(): Observable<TagViewModel[]> {
    return this.apiService.get('/API/dnn_OpenNewsSPA/Tags/GetList')
      .pipe(map(data => {
        return data;
      }));
  }

  Upsert(article): Observable<TagViewModel> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Tags/Upsert', article)
      .pipe(map(data => data));
  }

}
