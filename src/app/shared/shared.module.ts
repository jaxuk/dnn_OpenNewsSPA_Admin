import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './article-helpers';
//import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { ListErrorsComponent } from './list-errors.component';
//import { ShowAuthedDirective } from './show-authed.directive';
//import { PendingChangesGuard } from './pending-changes.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    //ArticleListComponent,
    //ArticleMetaComponent,
    //ArticlePreviewComponent,
    //FavoriteButtonComponent,
    //FollowButtonComponent,
    ListErrorsComponent,
    //PendingChangesGuard,
    //ShowAuthedDirective
  ],
  exports: [
    //ArticleListComponent,
    //ArticleMetaComponent,
    //ArticlePreviewComponent,
    CommonModule,
    //FavoriteButtonComponent,
    //FollowButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ListErrorsComponent,
    //PendingChangesGuard,
    RouterModule,
    //ShowAuthedDirective
  ]
})
export class SharedModule {}
