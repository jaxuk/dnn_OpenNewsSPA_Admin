import { ContextInfo } from './context-info';
import { DevContext as DevContext } from './dev-context';
import { ElementRef, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/timer';
import 'rxjs/Rx';

declare const window: any;

@Injectable()
export class Context {
  // todo: probably should set the replay-buffer to 1 for all the following, but must test!
  private midSubject = new ReplaySubject<number>(1);
  private tidSubject = new ReplaySubject<number>(1);
  private afTokenSubject = new ReplaySubject<string>(1);

  moduleId$ = this.midSubject.asObservable();
  tabId$ = this.tidSubject.asObservable();
  antiForgeryToken$ = this.afTokenSubject.asObservable();

  all$ = Observable.combineLatest(
    this.moduleId$,       // wait for module id
    this.tabId$,        // wait for tabId
    this.antiForgeryToken$)   // wait for security token
    .map(res => <ContextInfo>{  // then merge streams
      moduleId: res[0],
      tabId: res[1],
      antiForgeryToken: res[2]
    });

  constructor(
    @Optional() private devSettings: DevContext
  ) {

    // Dev settings with minimal ignore settings.
    this.devSettings = Object.assign({}, {
      ignoreMissingServicesFramework: false
    }, devSettings);
  }

  /**
   * Configure in the context of a HTMLNode.
   * @param htmlNode the HTMLNode
   */
  autoConfigure(htmlNode: ElementRef) {
    console.log('running context.service autoConfigure()');
    if (this.devSettings.forceUse) {
      this.midSubject.next(this.devSettings.moduleId);
      this.tidSubject.next(this.devSettings.tabId);
      this.afTokenSubject.next(this.devSettings.antiForgeryToken);
      return;
    }

    // Update / publish moduleId.
    const appCont = htmlNode.nativeElement;
    console.log(appCont);
    this.midSubject.next(appCont.dataset.mid);
    this.tidSubject.next(appCont.dataset.tid);
    
    // Check if DNN Services framework exists.
    console.log('Checking if DNN Services framework exists');
    if (window.$ && window.$.ServicesFramework) {
 
      // Run timer till sf is ready, but max for a second.
      const timer = Observable.timer(0, 100)
        .take(10)
        .subscribe(x => {

          // This must be accessed after a delay, as the SF is not ready yet.
          const sf = window.$.ServicesFramework(this.midSubject);

          // Check if sf is initialized.
          if (sf.getAntiForgeryValue() && sf.getTabId() !== -1) {
            timer.unsubscribe();
            console.log('sf is initialized.');
            this.tidSubject.next(sf.getTabId());
            this.afTokenSubject.next(sf.getAntiForgeryValue());
          } else {
            // Must reset, as they are incorrectly initialized when accessed early.
            if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
              window.dnn.vars = null;
            }
          }
        });
      return;
    }
    
    if (!this.devSettings.ignoreMissingServicesFramework) {
      throw new Error(`
        DNN Services Framework is missing, and it\'s not allowed according to devSettings.
        Either set devSettings to ignore this, or ensure it\'s there`);
    }

    this.tidSubject.next(this.devSettings.tabId);
    this.afTokenSubject.next(this.devSettings.antiForgeryToken);
  }
}
