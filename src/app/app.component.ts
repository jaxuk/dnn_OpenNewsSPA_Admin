import { Component, ElementRef, Inject } from '@angular/core';
import { APP_BASE_HREF } from "@angular/common";
import { Context } from './context/context.service';
import { DnnAppComponent } from './dnn-app.component';
import { Globals } from './globals';
import { SettingsService } from './shared';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
//export class AppComponent {
//}
export class AppComponent extends DnnAppComponent {
  title = 'app';
  constructor(
    element: ElementRef,
    context: Context,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(APP_BASE_HREF) private baseHref: string
  ) {
    super(element, context);
    this.settingsService.setGlobalSettings();
  }

  getLiveModuleUrl() {
    return this.settingsService.getCurrentSettings().PageTabUrl;
  }
  isEditor() {
    if (this.settingsService.getCurrentSettings().currentUser == null) {
      return false;
    }
    return this.settingsService.getCurrentSettings().currentUser.isEditor;
  }
  toggleSideNav() {
    document.querySelector('#sidenav').classList.toggle('active');
  }
  isAuthor() {
    if (this.settingsService.getCurrentSettings().currentUser == null) {
      return false;
    }
    return this.settingsService.getCurrentSettings().currentUser.isAuthor;
  }
  doSearch(e) {
    if (e.keyCode == 13) {
      this.router.navigate(['/articles']);
    }
  }
  ngOnInit(): void {
    
  }
}
