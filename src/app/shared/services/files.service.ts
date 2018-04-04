import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

import {
  FileViewModel,
  FileUploadModel
} from './../models';

export interface fileRet {
  alreadyExists: boolean;
  fileIconUrl: string
  fileId: number;
  fileName: string;
  message: string;
  orientation: object;
  path: string;
  prompt: string;
}


@Injectable()
export class FilesService {
  constructor(
    private apiService: ApiService
  ) { }

  upload(f: FileUploadModel, folder: string): Observable<any> {
    return this.apiService.upload('/API/dnn_OpenNewsSPA/Files/UploadFromNg', f, folder)
      .pipe(map((res: Response) => {
        return res.json();
      }));
  }

  GetArticleFile(articleId, fileId): Observable<FileViewModel> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Files/GetArticleFile', { articleId: articleId, fileId: fileId})
      .pipe(map(data => {
        return data;
      }));
  }

  GetFileById(fileId): Observable<FileViewModel> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Files/GetFileById', { fileId: fileId })
      .pipe(map(data => {
        return data;
      }));
  }

  GetFileInfoById(fileId): Observable<any> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Files/GetFileInfoById', { fileId: fileId })
      .pipe(map(data => {
        return data;
      }));
  }

  GetAll(articleId): Observable<FileViewModel[]> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Files/GetList', { articleId: articleId })
      .pipe(map(data => {
        return data;
      }));
  }

  Upsert(file): Observable<FileViewModel> {
    return this.apiService.post('/API/dnn_OpenNewsSPA/Files/Upsert', file)
      .pipe(map(data => data));
  }

}
