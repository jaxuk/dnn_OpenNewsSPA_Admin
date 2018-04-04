import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

import {
  ArticleViewModel
} from './../models';
import { ArticlePagedListMetaViewModel, ArticleQueryParams } from '../index';
import { DataTableParams } from 'angular5-data-table';
import { ValidationErrors } from '@angular/forms';


@Injectable()
export class ArticlesService {
  constructor(
    private apiService: ApiService
  ) { }

  validateUrlNotInUse(articleId: number, url: string) {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Articles/urlNotInUse', { articleId: articleId, url: url })
      .map(data => {
        var ret = data ? {} : { urlTaken: true };
        console.log(ret);
        return ret
      });
  }

  Get(id): Observable<ArticleViewModel> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Articles/Get', { articleId: id })
      .pipe(map(data => {
        return data;
      }));
  }

  GetAll(): Observable<ArticleViewModel[]> {
    return this.apiService.get('/API/dnn_OpenNewsSPA/Articles/GetList')
      .pipe(map(data => {
        return data;
      }));
  }
  GetPagedList(params: ArticleQueryParams): Observable<ArticlePagedListMetaViewModel> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Articles/GetPagedList', params)
      .pipe(map(data => {
        return data;
      }));
  }

  Update(article): Observable<ArticleViewModel> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Articles/Update', article)
      .pipe(map(data => data));
  }

  Upsert(article): Observable<ArticleViewModel> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Articles/Upsert', article)
      .pipe(map(data => data));
  }

  Delete(articleId): Observable<ArticleViewModel> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Articles/Delete', { articleId: articleId})
      .pipe(map(data => data));
  }

}
