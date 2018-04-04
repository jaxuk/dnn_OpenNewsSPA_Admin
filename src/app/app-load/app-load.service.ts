import { Injectable } from '@angular/core';
import { ElementRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Context } from '../context/context.service';
import { DnnAppComponent } from '../dnn-app.component';
import 'rxjs/add/operator/toPromise';
//import { ApiService } from '../shared';

//import { Globals } from '../globals';

//import {
//  SettingsViewModel,
//  SettingsService
//} from '../shared';
@Component({
  selector: 'app-root'
})

@Injectable()
export class AppLoadService{

  constructor(
    private httpClient: HttpClient
    //context: Context,
    //element: ElementRef
    //private apiService: ApiService,
    //private globals: Globals
  ) {
    //super(element, context);
  }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`initializeApp:: inside promise`);
      
      setTimeout(() => {
        console.log(`initializeApp:: inside setTimeout`);
        // doing something
        resolve();
      }, 3000);
    });
  }

  getSettings(): Promise<any> {
    console.log(`getSettings:: before http.get call`);

    //const promise = this.httpClient.get('http://localhost/API/dnn_OpenNewsSPA/Settings/GetSettings')
    //  .toPromise()
    //  .then(data => {
    //    console.log(`Settings from API: `, data);
    //    //this.globals.settings = settings;
        

    //    return data;
    //  });

    const promise = this.httpClient.get('http://private-1ad25-initializeng.apiary-mock.com/settings')
      .toPromise()
      .then(settings => {
        console.log(`Settings from API: `, settings);

        //APP_SETTINGS.connectionString = settings[0].value;
        //APP_SETTINGS.defaultImageUrl = settings[1].value;

        return settings;
      });

    return promise;
  }
}
