export interface FileUploadModel {
  name: string;
  icon: string;
  faIcon: string;
  size: string;
  file: File;
  uploaded: boolean;
  percentage?: number;
}
