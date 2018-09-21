import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { HelperService } from '../shared/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit, OnDestroy {
  public naModules$: Observable<any[]>;
  public isSubmitting: boolean = false;
  private killTrigger: Subject<void> = new Subject();
  private fetchLog$: Observable<string[]> = this.helperService.getImportLog();
  

  private refreshInterval$: Observable<string[]> = timer(0, 2000)
    .pipe(
    // This kills the request if the user closes the component 
    takeUntil(this.killTrigger),
    // switchMap cancels the last request, if no response have been received since last tick
    switchMap(() => this.fetchLog$),
    // catchError handles http throws 
    catchError(err => { console.log(err); this.toastr.error(err); return [] })
  );

  public importLogData$: string[];

  constructor(
    private helperService: HelperService,
    private toastr: ToastrService,
  ) {



  }

  ngOnDestroy() {
    this.killTrigger.next();
  }

  ngOnInit() {
    this.refreshInterval$.subscribe(value => this.importLogData$ = value);
    this.helperService.getNaModules().subscribe(data => {
      console.log('getNaModules');
      console.log(data);
      this.naModules$ = data;
      //this.toastr.info('Imported');
    },
      err => {
        this.toastr.error('Error getting Na Modules from server');
      });
  }

  public importModule() {
    console.log('importModule');
    if (confirm("Are you sure you want to delete all module content and import?")) {
      this.isSubmitting = true;
      var naModuleId = (<HTMLSelectElement>document.querySelector('#ddNaModule')).value;
      var resetIdentity = (<HTMLInputElement>document.querySelector('#cbResetIdentity')).checked;
      var identityInsert = (<HTMLInputElement>document.querySelector('#cbIdentityInsert')).checked;
      var clearLog = (<HTMLInputElement>document.querySelector('#cbClearLog')).checked;
      this.helperService.importModule(naModuleId, resetIdentity, identityInsert, clearLog).subscribe(data => {
        console.log(data);
        //this.naModules$ = data;
        this.toastr.info('Imported!');
        this.isSubmitting = false;
      },
        err => {
          this.toastr.error('Error importing naModule - this might be a red herring, it could have just timed out but is still running on the server - keep watching the log below');
          this.isSubmitting = false;
        });
    };
  }

  //public getImportLog() {
  //  console.log('displayImportLog');
  //  this.helperService.getImportLog().subscribe(data => {
  //    console.log(data);
  //    this.importLog = data;
  //  },
  //    err => {
  //      this.toastr.error('Error getting import log');
  //      this.isSubmitting = false;
  //    });
  //}
  

}
