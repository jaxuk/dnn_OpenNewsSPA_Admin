import { Component, OnInit, Input, Output, EventEmitter, OnChanges  } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProgressHttp } from "angular-progress-http";
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { InputFileModule } from 'ngx-input-file';

import {
  HelperService,
  SettingsViewModel,
  SettingsService,
  CategoryViewModel,
  CategoriesService,
  FileViewModel,
  FilesService
} from '../shared';

interface FileDescriptor {
  name: string;
  file: File;
  uploaded: boolean;
  percentage?: number;
}

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})

export class CategoryFormComponent implements OnInit {
  [x: string]: any;
  settings: SettingsViewModel = {} as SettingsViewModel;
  @Input() category: CategoryViewModel = {} as CategoryViewModel;
  @Output() public onUpserted = new EventEmitter();
  @Output() public onCancel = new EventEmitter();
  @Output() public onDelete = new EventEmitter();
  categoryForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  public inputFileModel: Array<any> = new Array<any>();
  public files: FileDescriptor[] = [];

  constructor(
    private helperService: HelperService,
    private toastr: ToastrService,
    private settingsService: SettingsService,
    private categoriesService: CategoriesService,
    private filesService: FilesService,
    private fb: FormBuilder,
    private progressHttp: ProgressHttp,
    private modalService: NgbModal
  ) {
    this.categoryForm = this.fb.group({
      Name: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      Description: ['', Validators.compose([Validators.maxLength(255)])],
      MetaTitle: ['', Validators.compose([Validators.maxLength(255)])],
      MetaDescription: ['', Validators.compose([Validators.maxLength(255)])],
      MetaKeywords: ['', Validators.compose([Validators.maxLength(255)])],
      PageHeadText: ['', Validators.compose([Validators.maxLength(500)])],
      URL: ['', {
        validators: Validators.compose([Validators.required, Validators.maxLength(255)]),
        asyncValidators: this.validateUrlNotInUse.bind(this),
        updateOn: 'blur'
      }],
    });
    
    
  }

  validateUrlNotInUse(control: AbstractControl) {
    return this.categoriesService.validateUrlNotInUse(this.category.CategoryID, control.value);
  }

  ngOnChanges() {
    this.categoryForm.reset({
      Name: this.category.Name,
      Description: this.category.Description,
      MetaTitle: this.category.MetaTitle,
      MetaDescription: this.category.MetaDescription,
      MetaKeywords: this.category.MetaKeywords,
      PageHeadText: this.category.PageHeadText,
      URL: this.category.URL
    });
  }

  public onFilesSelected(fileList: FileList) {
    
  }

  public parentUrl() {
    return this.settingsService.getCurrentSettings().PageTabUrl;
  }
  
  public nameChanged(event) {
    if (this.category.CategoryID <= 0) {
      this.urlChanged(event);
    }
  }

  public urlChanged(event) {
    this.helperService.cleanUrl(event.target.value).subscribe(res => {
      this.categoryForm.get('URL').setValue((res));
    });
  }

  onSubmit(f) {
    console.log(f);
  }

  deleteCategory() {
    if (confirm("Delete this category - are you sure?")) {
      this.isSubmitting = true;
      this.categoriesService.Delete(this.category.CategoryID).subscribe(
        data => {
          this.isSubmitting = false;
          this.onDelete.emit({

          });
          this.toastr.info('Category deleted!');
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    }
  }

  cancelChanges() {
    if (!this.categoryForm.untouched) {
      if (confirm("Discard current changes?")) {
        this.onCancel.emit();
      }
    } else {
      this.onCancel.emit();
    }
  }

  submitForm() {
    this.categoryForm.markAsTouched();
    if (this.categoryForm.valid) {
      console.log('submitForm');
      this.isSubmitting = true;
      // update the model
      this.updateCategory(this.categoryForm.value);
      this.categoriesService
        .Upsert(this.category)
        .subscribe(
        data => {
          this.isSubmitting = false;
          this.updateCategory(data);
          this.onUpserted.emit({
            value: this.category
          })
          this.toastr.info('Category saved');
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
        );
    } else {
      console.log(this.categoryForm);
    }
  }

  updateCategory(values: Object) {
    Object.assign(this.category, values);
  }

  onImageUploaded(e) {
    let fv: FileViewModel;
    this.filesService.GetFileById(e.fileId).subscribe(data => {
      console.log('onImageUploaded');
      console.log(data);
      this.category.Image = data;
    },
      err => {
        this.toastr.error('Error getting uploaded file from server');
      });
  }

  public joinForInputAccept(iary: string[]) {

    if (iary) {
      var ary = iary.slice(0);
      ary.forEach(function (item, index) {
        if (item.substr(0, 1) != '.') {
          ary[index] = '.' + item;
        }
      });
      return ary.join(',');
    }
  }

  public imageFolder() {
    return this.settingsService.getCurrentSettings().ImageDefaultImageFolder;
  }

  public allowedImages() {
    return this.settingsService.getCurrentSettings().ImageAllowedTypes;
  }

  public isDebugMode() {
    return this.settingsService.getCurrentSettings().debugEnabled;
  }

  verifyUrl(control: FormControl) {
    if (control.value) {
      this.helperService.cleanUrl(control.value).subscribe(res => {
        control.setValue(res);
      });
    }
  }

  ngOnInit() {

  }

}
