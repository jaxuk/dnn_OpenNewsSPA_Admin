import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainSettingsComponent } from './main-settings/main-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleFormComponent } from './article-form/article-form.component'
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { RenderTemplatesComponent } from './render-templates/render-templates.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { CustomFieldsComponent } from './custom-fields/custom-fields.component';
import { ImporterComponent } from './importer/importer.component';
import { PendingChangesGuard } from './shared/pending-changes.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'articles', component: ArticlesComponent },
  { path: 'article/:id', component: ArticleFormComponent, canDeactivate: [PendingChangesGuard] },
  { path: 'categories', component: CategoriesComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'render-templates', component: RenderTemplatesComponent },
  { path: 'custom-fields', component: CustomFieldsComponent },
  { path: 'email-templates', component: EmailTemplatesComponent },
  { path: 'main-settings', component: MainSettingsComponent, canDeactivate: [PendingChangesGuard] },
  { path: 'import', component: ImporterComponent },
  { path: 'dashboard', component: DashboardComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
