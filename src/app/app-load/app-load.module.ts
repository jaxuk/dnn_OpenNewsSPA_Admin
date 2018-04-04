import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
//import { Globals } from '../globals';
import { Context } from '../context/context.service';
import { ElementRef } from '@angular/core';
import { DevContext } from '../context/dev-context';
import { DnnInterceptor } from '../http/dnn.interceptor';
//import { ApiService } from '../shared';

import { AppLoadService } from './app-load.service';

export function init_app(
  appLoadService: AppLoadService
  //context: Context
  //element: ElementRef
) {
  console.log('init_app');
  return () => appLoadService.initializeApp();
}

//export function get_settings(appLoadService: AppLoadService) {
//  return () => appLoadService.getSettings();
//}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AppLoadService,
    //Globals,
    DevContext,
    Context,
    DnnInterceptor,
    //ApiService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    //{ provide: APP_INITIALIZER, useFactory: get_settings, deps: [AppLoadService, ElementRef, Context], multi: true },
  ]
})
export class AppLoadModule { }
