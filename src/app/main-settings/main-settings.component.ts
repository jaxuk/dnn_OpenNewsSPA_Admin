import { Component, OnInit, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComponentCanDeactivate } from '../shared/pending-changes.guard';

import {
  SettingsViewModel,
  SettingsService,
  HelperService,
  RoleViewModel
} from '../shared';
import { Observable } from 'rxjs/Observable';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-main-settings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.scss']
})
export class MainSettingsComponent implements OnInit, ComponentCanDeactivate {

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return this.settingsForm.untouched;
  }

  settings: SettingsViewModel = {} as SettingsViewModel;
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  TimeZones = [];
  Templates = [];
  obs_folders$: Observable<string[]>;
  obs_editorsRole$: Observable<string[]>;
  obs_authorRole$: Observable<string[]>;
  SortByOpts: string[] = [
    'StartDate',
    'EndDate'
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService,
    private toastr: ToastrService,
    private helperService: HelperService,
    private fb: FormBuilder
  ) {

    this.settingsForm = this.fb.group({
      BasicAllowCoreSearchIntegration: '',
      BasicArticlesPerPage: ['12', Validators.required],
      BasicRenderingTemplate: '',
      BasicServerTimeZone: '',
      BasicSortBy: '',
      BasicSortDirection: '',
      //CategoryDefaultCategories: '',
      CategoryIncludeInBreadcrumb: '',
      CategoryRequireCategory: '',
      FileDefaultFileFolder: ['', Validators.required],
      ImageDefaultImageFolder: ['', Validators.required],
      SEORemovePagePathFromURL: '',
      NotificationNotifyAuthorsOnApproval: '',
      NotificationNotifyEditorsOnSubmission: '',
      ImageAllowedTypes: '',
      FileAllowedTypes: '',
      PermissionsEditorRoles: ['', Validators.required],
      PermissionsAuthorRoles: ['', Validators.required],
      PermissionsAllowEditorsToSelfPublish: ''
    });
  }

  ngOnInit(): void {
    
    //Get TimeZones
    this.settingsService.GetTimeZones().subscribe(data => {
      Object.assign(this.TimeZones, data);
      this.settingsForm.patchValue(this.TimeZones);
    });
    //Get TimeZones
    this.settingsService.GetTemplates().subscribe(data => {
      Object.assign(this.Templates, data);
      this.settingsForm.patchValue(this.Templates);
    });
    //Get TimeZones
    this.obs_folders$ = this.settingsService.GetPortalFolders();
    //Get Roles
    this.obs_editorsRole$ = this.helperService.getRoles();
    this.obs_authorRole$ = this.helperService.getRoles();
    //Get Settings
    Object.assign(this.settings, this.settingsService.getCurrentSettings());
    if (Object.keys(this.settings).length === 0) {
      this.settingsService.GetSettings().subscribe(data => {
        Object.assign(this.settings, data);
        this.settingsForm.patchValue(this.settings);
      });
    } else {
      this.settingsForm.patchValue(this.settings);
    }
    
    
    
  }

  public isDebugMode() {
    return this.settingsService.getCurrentSettings().debugEnabled;
  }

  onSubmit(f) {
    //console.log(this.formGroup);
    console.log(f);
  }
  submitForm() {
    console.log('submitForm');
    if (this.settingsForm.valid) {
      this.isSubmitting = true;

      // update the model
      this.updateSettings(this.settingsForm.value);

      this.settingsService
        .UpdateSettings(this.settings)
        .subscribe(
        data => {
          this.isSubmitting = false;
          this.toastr.info('Settings saved');
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
        );
    }
  }

  updateSettings(values: any) {
    Object.assign(this.settings, values);
  }
}
