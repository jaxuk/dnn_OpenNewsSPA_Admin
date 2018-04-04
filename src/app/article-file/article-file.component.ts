import { Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileViewModel } from '../shared/index';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  //moduleId: module.id,
  selector: 'app-article-file',
  templateUrl: './article-file.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./article-file.component.scss']
})

export class ArticleFileComponent {

  isSubmitting = false;

  
  @Input('fileInfo') public fileInfo: FileViewModel;
  @Input('index') public index: number;
  @Input('group') public fileForm: FormGroup;

  @Output('removeFile') public removeFile: EventEmitter<number> = new EventEmitter<number>();

  closeResult: string;
  constructor(private modalService: NgbModal, private fb: FormBuilder) { }
  //modalref: NgbModalRef;
  open(content) {
    this.modalService.open(content, { windowClass: 'file-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  private fileInfoIsNull() {
    return this.fileInfo == null;
  }
  removeFileHandler() {
    if (confirm('Delete. Are you sure?')) {
      this.removeFile.emit(this.index);
    }
  }
  fileIconClass() {
    switch (this.fileInfo.Name.substr(this.fileInfo.Name.lastIndexOf('.') + 1)) {
      case "ppt":
        return "fa-file-powerpoint";
      case "pptx":
        return "fa-file-powerpoint";
      case "zip":
        return "fa-file-archive";
      case "rar":
        return "fa-file-archive";
      case "pdf":
        return "fa-file-pdf";
      case "docx":
        return "fa-file-word";
      case "doc":
        return "fa-file-word";
      case "xlsx":
        return "fa-file-excel";
      case "xls":
        return "fa-file-excel";
      default:
        return "fa-file";
    }
  }
  isImage() {
    if (this.fileInfoIsNull()) {
      return false;
    } else {
      return this.fileInfo.IsImage;
    }
  }
  fileName() {
    if (this.fileInfoIsNull()) {
      return "";
    } else {
      return this.fileInfo.Name;
    }
  }
  imageUrl() {
    if (this.fileInfoIsNull()) {
      return false;
    } else {
      return this.fileInfo.url;
    }
  }
}
