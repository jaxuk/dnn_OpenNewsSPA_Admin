import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ProgressHttp } from "angular-progress-http";
import { ToastrService } from 'ngx-toastr';
import {
  FileUploadModel,
  FileViewModel
} from '../models';
import { HelperService, fileRet, FilesService } from '../index';

@Component({
  selector: 'input-file',
  styleUrls: ['input-file.component.scss'],
  templateUrl: 'input-file.component.html'
})

export class InputFileComponent {
  @Input() public inputAccept: string;
  @Input() public extensions: string;
  @Input() public uploadFolder: string;
  @Input() public fileDisplayType = 'files';
  @Input() public dropText = 'Drop files here';
  @Input() public buttonText = 'Browse';
  @Input() public multiple: boolean;

  @Output() public acceptedFile: EventEmitter<FileUploadModel> = new EventEmitter<FileUploadModel>();
  @Output() public fileUploaded: EventEmitter<fileRet> = new EventEmitter<fileRet>();

  public uploads: FileUploadModel[] = [];
  public uploaded: FileViewModel[] = [];

  constructor(
    private toastr: ToastrService,
    private progressHttp: ProgressHttp,
    private helperService: HelperService,
    private filesService: FilesService,
  ) { }

  private buildFileUploadObject(inputFile: any) {
    var f = {
      name: inputFile.name,
      file: inputFile,
      uploaded: false,
      percentage: null,
      icon: null,
      faIcon: null,
      size: '0kb'
    };
    this.setFileIcon(f, inputFile);
    this.setSize(f, inputFile);
    return f;
  }

  /**
     * Sets the icon of the file.
     * @param file
     * @param inputFile
     */
  private setFileIcon(file: FileUploadModel, inputFile: any): void {
    let icon: string;

    switch (inputFile.type) {
      case 'application/pdf':
        icon = 'fa-file-pdf';
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        icon = 'fa-file-word';
        break;
      case 'application/zip':
        icon = 'fa-file-archive';
        break;
      default:
        icon = 'fa-file';
    }

    file.faIcon = icon;
  }

  /**
     * Accepted file handler.
     * @param file
     */
  private fileUploadedHandeler(file: FileUploadModel, upRes: fileRet): void {
    file.uploaded = true;
    this.fileUploaded.emit(upRes);
    this.uploads = this.uploads.filter(obj => obj !== file);
  }

  private uploadFile(f: FileUploadModel) {
    this.filesService.upload(f, this.uploadFolder).subscribe(data => {
      console.log(data);
      if (data.alreadyExists) {
        this.toastr.warning('File: ' + f.name + ' already exists, it has not been uploaded but the existing file has been added to you uploads');
        this.fileUploadedHandeler(f, data);
      }else if (data.fileId > 0) {
        this.toastr.success('File: ' + f.name + ' uploaded');
        this.fileUploadedHandeler(f, data);
      } else if (data.message != null && data.message != "") {
        f.percentage = null;
        this.toastr.warning('File: ' + f.name + ' - ' + data.message);
      } else {
        this.toastr.warning('File: ' + f.name + ' - ELSE');
      }
    });
  }

  /**
   * Gets the size of the file to display.
   * @param file
   */
  private setSize(file: FileUploadModel, inputFile: any): void {
    const size = Math.round(inputFile.size / 1024);
    file.size = '(' + size + ' KB)';
  }

  public onInputAction(e) {
    console.log(event);
    switch (e.action) {
      case 1:
        var uf = this.buildFileUploadObject(e.file);
        this.uploads.push(uf);
        //this.toastr.info('File: ' + e.file.name + ' added for upload');
        this.uploadFile(uf);
        break;
      case 2:
        this.toastr.warning('File: ' + e.file.name + ' upload denied');
      case 4:
        this.toastr.warning('Could not add file: ' + e.file.name);
      case 3:
        this.toastr.warning('Could not remove file: ' + e.file.name);
      case 0:
        this.toastr.warning('Removed file: ' + e.file.name);
      default:
        break;
    }
  }

  public uploadingIsNotNullOrEmpty(): boolean {
    return this.uploads != null && this.uploads.length != null && this.uploads.length > 0;
  }
}
