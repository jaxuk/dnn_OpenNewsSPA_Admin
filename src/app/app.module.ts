import { APP_BASE_HREF, PlatformLocation } from "@angular/common";
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { Context } from './context/context.service';
import { DevContext } from './context/dev-context';
import { DnnInterceptor } from './http/dnn.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MainSettingsComponent } from './main-settings/main-settings.component';
import { AppRoutingModule } from './/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesComponent } from './articles/articles.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { AppLoadModule } from './app-load/app-load.module';
import { TreeModule } from 'angular-tree-component';
import { Ng2FileInputModule } from 'ng2-file-input';
//import { InputFileModule } from 'ngx-input-file';
import { HttpModule } from "@angular/http";
import { ProgressHttpModule } from "angular-progress-http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoadingBarHttpClientModule  } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { TypeaheadModule } from 'ngx-type-ahead';
import { SelectModule } from 'ng2-select';
import { SortablejsModule } from 'angular-sortablejs';
import { DataTableModule } from 'angular5-data-table';

import {
  ApiService,
  SettingsService,
  CategoriesService,
  TagsService,
  FilesService,
  ArticlesService,
  HelperService,
  SharedModule,
  CustomFieldsService
} from './shared';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { InputFileComponent } from './shared/file-input/input-file.component';
import { ArticleFileComponent } from './article-file/article-file.component';
import { RenderTemplatesComponent } from './render-templates/render-templates.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { CustomFieldsComponent } from './custom-fields/custom-fields.component';
import { DynamicFormModule } from './shared/dynamic-form/dynamic-form.module';
import { ImporterComponent } from './importer/importer.component';

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

//export function get_settings(appLoadService: SettingsService) {
//  return () => appLoadService.GetSettingsPromise();
//}

@NgModule({
  declarations: [
    AppComponent,
    MainSettingsComponent,
    DashboardComponent,
    ArticlesComponent,
    CategoriesComponent,
    TagsComponent,
    CategoryFormComponent,
    ArticleFormComponent,
    InputFileComponent,
    ArticleFileComponent,
    RenderTemplatesComponent,
    EmailTemplatesComponent,
    CustomFieldsComponent,
    ImporterComponent
  ],
  imports: [
    DynamicFormModule,
    DataTableModule,
    NgbModule.forRoot(),
    BrowserModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    HttpClientModule,
    HttpModule,
    ProgressHttpModule,
    AppRoutingModule,
    SharedModule,
    TreeModule,
    Ng2FileInputModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    TypeaheadModule,
    SortablejsModule.forRoot({ animation: 150 })
    //AppLoadModule
  ],
  providers: [
    DevContext,
    Context,
    DnnInterceptor,
    ApiService,
    SettingsService,
    CategoriesService,
    HelperService,
    ArticlesService,
    TagsService,
    CustomFieldsService,
    FilesService,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    }
    //Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
