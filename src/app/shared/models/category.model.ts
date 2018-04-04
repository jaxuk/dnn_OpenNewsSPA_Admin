import { FileViewModel } from './fileView.model';

export interface CategoryViewModel {
  CategoryID: -1;
  Name: '';
  Image: FileViewModel;
  Children: CategoryViewModel[];
  Description: '';
  MetaTitle: '';
  MetaDescription: '';
  MetaKeywords: '';
  PageHeadText: '';
  ShortURL: '';
  URL: '';
}
