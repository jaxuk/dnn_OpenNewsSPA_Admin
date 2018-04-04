import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ProgressHttp } from "angular-progress-http";
import { ToastrService } from 'ngx-toastr';
import {
  FileUploadModel,
  FileViewModel
} from '../models';

@Component({
  selector: 'preview-modal',
  styleUrls: ['preview-modal.component.scss'],
  templateUrl: 'preview-modal.component.html'
})



export class PreviewModalComponent {
  @Input() public controlLabel = 'Files';
  @Input() public fileDisplayType = 'files';
  @Input() public fileModel: FileViewModel;

  isSubmitting = true;

  constructor(
    private toastr: ToastrService,
  ) { }

  
}
