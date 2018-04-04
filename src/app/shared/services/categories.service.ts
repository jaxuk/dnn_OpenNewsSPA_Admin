import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

import {
  CategoryViewModel
} from './../models';


@Injectable()
export class CategoriesService {
  constructor(
    private apiService: ApiService
  ) { }

  validateUrlNotInUse(categoryId: number, url: string) {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Categories/urlNotInUse', { categoryId: categoryId, url: url })
      .map(data => {
        var ret = data ? {} : { urlTaken: true };
        console.log(ret);
        return ret
      });
  }

  
  GetAll(): Observable<CategoryViewModel[]> {
    console.log('GetAll Categories()');
    return this.apiService.get('/API/dnn_OpenNewsSPA/Categories/GetList')
      .pipe(map(data => {
        return data;
      }));
  }

  GetTree(): Observable<CategoryViewModel[]> {
    console.log('GetAll Categories()');
    return this.apiService.get('/API/dnn_OpenNewsSPA/Categories/GetTree')
      .pipe(map(data => {
        return data;
      }));
  }

  Update(category): Observable<CategoryViewModel> {
    console.log('UpdateCategory()');
    return this.apiService.post('/API/dnn_OpenNewsSPA/Categories/Update', category)
      .pipe(map(data => data));
  }

  Upsert(category): Observable<CategoryViewModel> {
    console.log('UpdateCategory()');
    return this.apiService.post('/API/dnn_OpenNewsSPA/Categories/Upsert', category)
      .pipe(map(data => data));
  }

  UpdateTree(categories) {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Categories/UpdateCategoryTree', categories)
      .pipe(map(data => data));
  }

  Delete(categoryId): Observable<CategoryViewModel> {
    console.log('UpdateCategory()');
    return this.apiService.post('/API/dnn_OpenNewsSPA/Categories/Delete', { categoryId: categoryId})
      .pipe(map(data => data));
  }

}
