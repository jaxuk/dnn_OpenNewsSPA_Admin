import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeModule, TreeComponent } from 'angular-tree-component';
import { ITreeOptions } from 'angular-tree-component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {
  SettingsViewModel,
  SettingsService,
  CategoryViewModel,
  CategoriesService
} from '../shared';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  settings: SettingsViewModel = {} as SettingsViewModel;
  categories: CategoryViewModel[] = new Array<CategoryViewModel>();
  selectedCategory: CategoryViewModel = null;
  errors: Object = {};
  isSubmitting = false;
  treeOptions: ITreeOptions = {
    idField: 'CategoryID',
    displayField: 'Name',
    childrenField: 'Children',
    allowDrag: true
  };
  @ViewChild(TreeComponent)
  private catTree: TreeComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private settingsService: SettingsService,
    private categoriesService: CategoriesService,
    private modalService: NgbModal
  ) { }

  onEvent = ($event) => console.log($event);

  onCatChange($event) {
    this.selectedCategory = $event.node.data;
  }

  onMoveNode($event) {
    this.categoriesService.UpdateTree(this.categories).subscribe(
      success => {
        this.toastr.info('Category tree updated');
      }
    );;
    
  }

  cancelEditing($event) {
    if (this.selectedCategory.CategoryID <= 0) {
      this.removeCurrentCategory();
    }
    this.selectedCategory = null;
  }

  removeCurrentCategory() {
    this.categories = this.categories.filter(c => c.CategoryID !== this.selectedCategory.CategoryID);
  }

  categoryDeleted($event) {
    this.removeCurrentCategory();
    this.selectedCategory = null;
  }

  newCategory() {
    this.selectedCategory = <CategoryViewModel>({
      CategoryID: -1,
      Name: '',
      Description: '',
      MetaTitle: '',
      MetaDescription: '',
      MetaKeywords: '',
      PageHeadText: '',
      ShortURL: '',
      URL: ''
    });
    this.categories.push(this.selectedCategory);
    this.catTree.treeModel.update();
  }

  categoryUpserted($event) {
    this.catTree.treeModel.update();
    this.catTree.treeModel.getNodeById(this.selectedCategory.CategoryID).setActiveAndVisible();
  }

  populateCategories() {
    this.categoriesService.GetTree().subscribe(data => {
      console.log(data);
      Object.assign(this.categories, data);
      this.catTree.treeModel.update();
    });
  }

  ngOnInit() {
    this.populateCategories();
  }

}
