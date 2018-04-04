import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleFormComponent } from '../article-form/article-form.component'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';

import {
  SettingsViewModel,
  SettingsService,
  CategoryViewModel,
  ArticleViewModel,
  ArticlesService,
  CategoriesService,
  TagViewModel,
  ArticleQueryParams
} from '../shared';
import { DataTableResource, DataTableParams } from 'angular5-data-table';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  settings: SettingsViewModel = {} as SettingsViewModel;
  categories: CategoryViewModel[] = new Array<CategoryViewModel>();
  articles: ArticleViewModel[] = new Array<ArticleViewModel>();
  selectedArticle: ArticleViewModel = null;
  errors: Object = {};
  isSubmitting = false;
  //itemResource = new DataTableResource(this.articles);
  //items = [];
  articleCount = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private settingsService: SettingsService,
    private articlesService: ArticlesService,
    private categoriesService: CategoriesService,

  ) {
    
  }

  tagsToString(item: ArticleViewModel) {
    return item.Tags.map(tag => { return tag.name }).join(",");
  }
  categoriesToString(item: ArticleViewModel) {
    return item.Categories.map(cat => { return cat.Name }).join(",");
  }

  //loadArticles() {
  //  let params: ArticleQueryParams = {
  //    sortAsc: false,
  //    sortBy: 'StartDate',
  //    offset: 0,
  //    limit: 10,
  //    searchPhrase: (<HTMLInputElement>document.querySelector("input#txtArticleSearch")).value,
  //    status: null
  //  };
  //}

  reloadItems(params: ArticleQueryParams) {
    params.searchPhrase = (<HTMLInputElement>document.querySelector("input#txtArticleSearch")).value;
    params.status = null;
    console.log(params);
    this.articlesService.GetPagedList(params).subscribe(data => {
      var tbodys = Array.from(document.querySelectorAll("data-table#articlesGrid tbody"));
      tbodys.forEach((el) => {
        el.remove();
      });
      this.articleCount = data.meta.TotalCount;
      Object.assign(this.articles, data.data);
      console.log(data);
      console.log('reloadItems()');
    }, err => {
      this.toastr.error('Error getting articles');
    });
  }

  ngOnInit() {
    //this.loadArticles();
  }

}

