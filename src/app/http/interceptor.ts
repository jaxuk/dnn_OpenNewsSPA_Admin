import { ContextInfo } from '../context/context-info';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Rx";
import { Context } from "../context/context.service";
import { Subject } from 'rxjs/Subject';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private context: Context
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('intercepted');
    //console.log(this.context);
    return this.context.all$.take(1)
      .flatMap(ctx => {
        
        // Clone the request and update the url with Dnn params.
        const newReq = req.clone({
          //url: ctx.path + req.url,
          //url: '/API/dnn_OpenNewsSPA' + req.url,
          setHeaders: {
            ModuleId: ctx.moduleId.toString(),
            TabId: ctx.tabId.toString(),
            RequestVerificationToken: ctx.antiForgeryToken,
            'X-Debugging-Hint': 'bootstrapped by Dnn4Angular',
          },
        });
        //console.log('returned intercept');
        return next.handle(newReq);
      });
  }
}
