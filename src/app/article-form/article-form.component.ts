import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewEncapsulation, ChangeDetectorRef, HostListener 
} from '@angular/core';
import { Router, ActivatedRoute, CanDeactivate } from '@angular/router';
//import { NgForm } from '@angular/forms';
import { FormBuilder, FormArray, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProgressHttp } from "angular-progress-http";
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {
  HelperService,
  ArticlesService,
  TagsService,
  SettingsService,
  CategoriesService,
  SettingsViewModel,
  CategoryViewModel,
  ArticleViewModel,
  TagViewModel,
  UserViewModel,
  FileUploadModel,

  fileRet,
  FilesService,
  FileViewModel,
  CustomFieldsService,
  CustomDefModel
} from '../shared';
import { SortablejsOptions } from 'angular-sortablejs/dist';
import { ComponentCanDeactivate } from '../shared/pending-changes.guard';


@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit, ComponentCanDeactivate  {

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return this.articleForm.untouched;
  }

  public imageUploads: FileViewModel[] = [];
  public fileUploads: FileViewModel[] = [];
  public customDefs: CustomDefModel[] = [];
  obs_authors$: Observable<UserViewModel[]>;
  authors: UserViewModel[];
  article: ArticleViewModel = {} as ArticleViewModel;
  obs_alltags$: Observable<TagViewModel[]>;
  alltags: TagViewModel[];
  obs_allcategories$: Observable<CategoryViewModel[]>;
  allcategories: CategoryViewModel[];
  obs_strTags$: Observable<string[]>;
  articleForm: FormGroup;
  errors: Object = {};
  isSubmitting = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private toastr: ToastrService,
    private settingsService: SettingsService,
    private customFieldsService: CustomFieldsService,
    private tagsService: TagsService,
    private categoriesService: CategoriesService,
    private articlesService: ArticlesService,
    private filesService: FilesService,
    private fb: FormBuilder,
    private progressHttp: ProgressHttp,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }
  imageSortableOpts: SortablejsOptions = {
    onEnd: (ev) => {
      this.imageUploads.splice(ev.newIndex, 0, this.imageUploads.splice(ev.oldIndex, 1)[0]);
      //[this.imageUploads[ev.oldIndex], this.imageUploads[ev.newIndex]] = [this.imageUploads[ev.newIndex], this.imageUploads[ev.oldIndex]];
      this.changeDetectorRef.detectChanges();
    }
  };
  private initForm() {
    this.articleForm = this.fb.group({
      Title: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      Summary: ['', Validators.compose([Validators.maxLength(255)])],
      Body: ['', Validators.required],
      MetaTitle: ['', Validators.compose([Validators.maxLength(255)])],
      MetaDescription: ['', Validators.compose([Validators.maxLength(255)])],
      MetaKeywords: ['', Validators.compose([Validators.maxLength(255)])],
      PageHeadText: ['', Validators.compose([Validators.maxLength(500)])],
      //URL: ['', Validators.compose([Validators.required, Validators.maxLength(255), this.validateUrlNotInUse.bind(this)])],
      URL: ['', {
        validators: Validators.compose([Validators.required, Validators.maxLength(255)]),
        asyncValidators: this.validateUrlNotInUse.bind(this),
        updateOn: 'blur'
      }],
      Tags: [''],
      Categories: this.categoryValidator(),
      PublishTime: [''],
      PublishDate: ['', Validators.required],
      ArchiveTime: [''],
      ArchiveDate: [''],
      IsFeatured: ['false'],
      AutoArchive: ['false'],
      Author: ['', Validators.required],
      Images: this.fb.array([]),
      Files: this.fb.array([]),
      CustomTypes: this.fb.group({})
    });
  }

  categoryValidator() {
    if (this.settingsService.getCurrentSettings().CategoryRequireCategory) {
      return ['', Validators.required];
    } else {
      return [''];
    }
  }

  validateUrlNotInUse(control: AbstractControl) {
    return this.articlesService.validateUrlNotInUse(this.articleId(), control.value);
  }
  initFileControl(file: FileViewModel) {
    if (file == null) {
      return this.fb.group({
        Title: [''],
        Description: [''],
      });
    } else {
      return this.fb.group({
        Title: [file.Title],
        Description: [file.Description],
      });
    }
  }
  initCustomObjects(cDefs: CustomDefModel[]) {
    const group = <FormGroup>this.articleForm.controls['CustomTypes'];
    if (cDefs == null) {
      return this.fb.group({});
    } else {
      for (var i = 0; i < cDefs.length; i++) {
        cDefs[i].Fields.forEach((f, i)  => {
          if (f.validators) {
            console.log(f.validators);
            f.validators.forEach((v, ii) => {
              //f.validation.push(new Function( eval(v) ));
            });
          }
          //cDefs[i].Fields[i] = f;
        });
        group.addControl(cDefs[i].TypeName, this.fb.group({}));
        //this.addCustomObjectControl(cDefs[i])
      }
    }
  }
  initCustomObjectControl(cDef: CustomDefModel) {
    return this.fb.group({
      [cDef.TypeName]: null
    });
    //if (cDef == null) {
    //  return this.fb.group({
    //    [cDef.TypeName]: this.fb.array([])
    //  });
    //} else {
    //  return this.fb.group({
    //    [cDef.TypeName]: this.fb.array([])
    //  });
    //}
  }
  dynFormBuilt() {
    console.log('dynFormBuilt()');
    this.ModelToForm();
  }
  addCustomObjectControl(cDef: CustomDefModel) {
    const control = <FormArray>this.articleForm.controls["CustomTypes"];
    control.push(this.initCustomObjectControl(cDef));
  }
  initFileControls(controlName: string, files: FileViewModel[]) {
    if (files == null) {
      return this.fb.array([]);
    } else {
      const control = <FormArray>this.articleForm.controls[controlName];
      var diff = (files.length - control.controls.length);
      while (files.length > control.controls.length) {
        this.addFileControl(controlName, null);
      }
    }
  }
  addFileControl(controlName: string, file: FileViewModel) {
    const control = <FormArray>this.articleForm.controls[controlName];
    control.push(this.initFileControl(file));
  }
  addFileControls(controlName: string, files: FileViewModel[]) {
    if (files != null) {
      files.forEach(f => {
        this.addFileControl(controlName, f);
      }); 
    }
  }
  
  onRemoveFile(controlName: string, i: number) {
    // remove address from the list
    const control = <FormArray>this.articleForm.controls[controlName];
    control.removeAt(i);
    switch (controlName) {
      case 'Images':
        this.imageUploads.splice(i, 1);
        break;
      case 'Files':
        this.fileUploads.splice(i, 1);
        break;
    }
    this.changeDetectorRef.detectChanges();
    //console.log('files removed at:' + i.toString());
  }
  onImageUploaded(e) {
    let fv: FileViewModel;
    this.filesService.GetArticleFile(this.articleId, e.fileId).subscribe(data => {
      console.log('onImageUploaded');
      console.log(data);
      if (this.imageUploads.filter(obj => obj.FileId === data.FileId).length == 0) {
        this.imageUploads.push(data);
        this.addFileControl('Images', data);
      } else {
        this.toastr.info('Duplicate image. ' + data.Name + ' not added');
      }
      
    },
      err => {
        this.toastr.error('Error getting file from server');
      });
  }
  onFileUploaded(e) {
    let fv: FileViewModel;
    this.filesService.GetArticleFile(this.articleId, e.fileId).subscribe(data => {
      console.log('onFileUploaded');
      console.log(data);
      if (this.fileUploads.filter(obj => obj.FileId === data.FileId).length == 0) {
        this.fileUploads.push(data);
        this.addFileControl('Files', data);
      } else {
        this.toastr.info('Duplicate file. ' + data.Name + ' not added');
      }

    },
      err => {
        this.toastr.error('Error getting file from server');
      });
  }
  private ModelToForm() {
    this.initFileControls('Images', this.article.Images);
    this.initFileControls('Files', this.article.Files);
    console.log('customTypes');
    console.log(this.article.CustomTypes);
    this.articleForm.patchValue({
      Title: this.article.Title,
      Summary: this.article.Summary,
      Body: this.article.Body,
      MetaTitle: this.article.MetaTitle,
      MetaDescription: this.article.MetaDescription,
      MetaKeywords: this.article.MetaKeywords,
      PageHeadText: this.article.PageHeadText,
      URL: this.article.URL,
      Tags: this.getTagsFromModel(),
      Categories: this.getCategoriesFromModel(),
      PublishTime: this.GetTimeFromModel(this.article.StartDate),
      PublishDate: this.GetDateFromModel(this.article.StartDate),
      ArchiveTime: this.GetTimeFromModel(this.article.EndDate),
      ArchiveDate: this.GetDateFromModel(this.article.EndDate),
      IsFeatured: this.article.IsFeatured,
      AutoArchive: this.article.AutoArchive,
      Author: this.article.AuthorID,
      Files: this.article.Files,
      Images: this.article.Images,
      CustomTypes: (this.article.CustomTypes == null ? {} : this.article.CustomTypes)
    });
  }
  private FormToModel() {
    var f = this.articleForm.value;
    this.updateArticle({
      Title: f.Title,
      Summary: f.Summary,
      Body: f.Body,
      MetaTitle: f.MetaTitle,
      MetaDescription: f.MetaDescription,
      MetaKeywords: f.MetaKeywords,
      PageHeadText: f.PageHeadText,
      URL: f.URL,
      Tags: this.getTagsForModel(f, this.alltags),
      Categories: this.getCategoriesForModel(f, this.allcategories),
      StartDate: this.GetDateTimeFromForm(f.PublishDate, f.PublishTime),
      EndDate: this.GetDateTimeFromForm(f.ArchiveDate, f.ArchiveTime),
      IsFeatured: f.IsFeatured,
      AutoArchive: f.AutoArchive,
      AuthorID: f.Author,
      Files: this.getFilesForModel(f),
      Images: this.getImagesForModel(f),
      CustomTypes: f.CustomTypes
    });
  }
  private getFilesForModel(f) {
    if (f.Files==null) {
      return null;
    }
    let files: FileViewModel[] = [];
    f.Files.forEach((con, i) => {
      files.push(this.updateFileItemFromControl(con, this.fileUploads[i]))
    });
    return files;
  }
  private getImagesForModel(f) {
    if (f.Images == null) {
      return null;
    }
    let files: FileViewModel[] = [];
    f.Images.forEach((con, i) => {
      files.push(this.updateFileItemFromControl(con, this.imageUploads[i]))
    });
    return files;
  }
  private updateFileItemFromControl(con, file) {
    file.Title = con.Title;
    file.Description = con.Description;
    return file;
  }
  
  private getTagsFromModel() {
    if (this.article.Tags == null) {
      return null;
    }
    return this.article.Tags.map(tag => { return tag.name });
  }
  private getCategoriesFromModel() {
    if (this.article.Categories == null) {
      return null;
    }
    return this.article.Categories.map(cat => { return cat.CategoryID });
  }
  private getCategoriesForModel(f, allcats$) {
    if (f.Categories == null) {
      return null;
    }
    let retCats: Array<CategoryViewModel[]> = new Array<CategoryViewModel[]>();
    for (let c of f.Categories) {
      retCats.push(allcats$.filter(ct => ct.CategoryID === c)[0]);
    }
    return retCats;
  }

  private getTagsForModel(f, alltags$) {
    if (f.Tags == null) {
      return null;
    }
    let retTags: Array<TagViewModel> = new Array<TagViewModel>();
    for (let t of f.Tags) {
      let newTag: TagViewModel;
      newTag = alltags$.filter(tg => tg.name === t)[0];
      if (newTag == null) {
        newTag = { TagID: -1, name: t };
      }
      retTags.push(newTag);
    }
    return retTags;
  }

  private GetDateTimeFromForm(date, time) {
    var d;
    if (date != null && time != null) {
      d = new Date(date.year, date.month - 1, date.day, time.hour, time.minute);
    } else if (date != null) {
      d = new Date(date.year, date.month - 1, date.day)
    } else {
      d = null;
    }
    console.log(d);
    return d;
  }

  private GetDateFromModel(datetimeStr) {
    var datetime = new Date(datetimeStr);
    if (typeof datetime.getMonth === 'function' && datetime.getFullYear() > 1) {
      return { year: datetime.getFullYear(), month: datetime.getMonth() + 1, day: datetime.getDate() }
    } else {
      return null;
    }
  }
  private GetTimeFromModel(datetimeStr) {
    var datetime = new Date(datetimeStr);
    if (typeof datetime.getHours === 'function' && datetime.getFullYear() > 1 ) {
      return { hour: datetime.getHours(), minute: datetime.getMinutes(), second: 0}
    } else {
      return null;
    }
  }

  private fetchData() {
    this.obs_authors$ = this.helperService.getAuthors();
    this.obs_allcategories$ = this.categoriesService.GetAll();
    this.obs_alltags$ = this.tagsService.GetAll();
    this.obs_strTags$ = this.obs_alltags$.map((array: TagViewModel[]) => { return array.map(tag => tag.name) });
    this.obs_authors$.pipe(
      map(data => data)
    ).subscribe(data => {
      this.authors = data;
    });
    this.obs_allcategories$.pipe(
      map(data=>data)
    ).subscribe(data => this.allcategories = data);
    this.obs_alltags$.pipe(
      map(data => data)
    ).subscribe(data => this.alltags = data);

    this.customFieldsService.GetAll().pipe(
      map(data => data)
    ).subscribe(data => {
      this.initCustomObjects(data);
      this.customDefs = data;
      
    });

    this.loadArticle();
    
  }

  public AutoArchiveOnChange(event): void {
    console.log('AutoArchiveOnChange');
    console.log(event);
  }

  //public onImageInputAction(e) {
  //  console.log(event);
  //  if (e.action == 1) {
  //    this.imageUploads.push({ name: e.file.name, file: e.file, uploaded: false, percentage: null });
  //  }
  //}

  public deleteable() {
    return (this.article.ArticleID > 0)
  }
  public publishable() {
    return (this.articleForm.valid)
  }
  public ShowArchive() {
    var show = (this.articleForm.controls['AutoArchive'].value);
    return show;
  }

  public titleChanged(event) {
    if (this.article.ArticleID <= 0 && event.target.value!='') {
      this.urlChanged(event);
    }
  }

  public urlChanged(event) {
    this.helperService.cleanUrl(event.target.value).subscribe(res => {
      this.articleForm.get('URL').setValue((res));
    });
  }

  loadArticle() {
    this.isSubmitting = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.articlesService
        .Get(id)
        .subscribe(
        data => {
          console.log(data);
          this.updateArticle(data);
          this.ModelToForm();
          this.isSubmitting = false;
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
        );
  }

  ngOnInit() {
    this.fetchData();
    this.initForm();
  }

  updateArticle(values: Object) {
    Object.assign(this.article, values);
    Object.assign(this.fileUploads, this.article.Files);
    Object.assign(this.imageUploads, this.article.Images);
  }

  public clickCancel() {
    if (!this.articleForm.untouched) {
      if (confirm("Discard current changes?")) {
        
        this.router.navigate(['/articles']);
      }
    } else {
      this.router.navigate(['/articles']);
    }
  }


  public clickDelete() {
    if (confirm("Are you sure you want to delete this article?")) {
      this.isSubmitting = true;
      this.FormToModel();
      this.article.IsDeleted = true;
      this.articlesService.Upsert(this.article).subscribe(
        data => {
          // Update the DB.
          this.toastr.warning('Article: DELETED');
          this.router.navigate(['/articles']);
        },
        err => {
          this.toastr.error('error deleting article');
          this.errors = err;
          this.isSubmitting = false;
        }
      );
      
    }
  }
  public articleId() {
    return this.article.ArticleID;
  }
  public imageFolder() {
    return this.settingsService.getCurrentSettings().ImageDefaultImageFolder;
  }
  public allowedImages() {
    return this.settingsService.getCurrentSettings().ImageAllowedTypes;
  }
  public articleHeading() {
    if (this.article == null) {
      return "Article";
    }
    if (this.article.Title != '') {
      return 'Editing Article ';
    } else {
      return 'New Article';
    }
  }
  public userCanEdit() {
    //return true;
    if(this.article == null) {
      return null;
    }
    if (this.article.Actions == null) {
      return null;
    }
    if (this.article.Actions.includes('Edit')) {
      return true;
    } else {
      return false;
    }
  }
  public articleStatusClass() {
    if (this.article == null || this.article.Status == null) {
      return '';
    }
    switch (this.article.Status.toLowerCase()) {
      case 'draft': {
        return 'secondary';
      }
      case 'deleted': {
        return 'dark';
      }
      case 'needsapproval': {
        return 'warning';
      }
      case 'live': {
        return 'success';
      }
      case 'expired': {
        return 'dark';
      }
      case 'upcoming': {
        return 'light';
      }
      default: {
        return 'secondary';
      }
    } 
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
  isEditor() {
    if (this.settingsService.getCurrentSettings().currentUser == null) {
      return false;
    }
    return this.settingsService.getCurrentSettings().currentUser.isEditor;
  }
  isAuthor() {
    if (this.settingsService.getCurrentSettings().currentUser == null) {
      return false;
    }
    return this.settingsService.getCurrentSettings().currentUser.isAuthor;
  }
  public allowedFiles() {
    return this.settingsService.getCurrentSettings().FileAllowedTypes;
  }
  public isDebugMode() {
    return this.settingsService.getCurrentSettings().debugEnabled;
  }
  public fileFolder() {
    return this.settingsService.getCurrentSettings().FileDefaultFileFolder;
  }
  public clickPublish() {
    this.article.IsDraft = false;
    this.article.IsDeleted = false;
    this.submitForm();
  }
  public clickSaveDraft() {
    this.article.IsDraft = true;
    this.article.IsDeleted = false;
    this.submitForm();
  }

  public submitForm() {
    this.articleForm.markAsTouched();
    if (this.articleForm.valid) {
      console.log('submitForm');
      this.isSubmitting = true;
      // update the model
      this.FormToModel();
      console.log(this.article);
      this.articlesService
        .Upsert(this.article)
        .subscribe(
        data => {
          const id = +this.route.snapshot.paramMap.get('id');
          this.updateArticle(data);
          if (id != this.article.ArticleID) {
            this.router.navigateByUrl('/article/' + this.article.ArticleID.toString());
          }
          this.ModelToForm();
          this.isSubmitting = false;
          this.toastr.info('article saved');
        },
        err => {
          this.toastr.error('error updating article');
          this.errors = err;
          this.isSubmitting = false;
        }
        );
    } else {
      console.log(this.articleForm);
    }
  }

}
