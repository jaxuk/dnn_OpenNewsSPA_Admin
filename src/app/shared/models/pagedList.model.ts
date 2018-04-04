import { ArticleViewModel } from './';
export class PagedListMetaViewModel{
    public HasNextPage: boolean;
    public HasPreviousPage: boolean;
    public IsFirstPage: boolean;
    public IsLastPage: boolean;
    public PageCount: number;
    public PageIndex: number;
    public PageSize: number;
    public TotalCount : number;
    public Count : number;
}
export class ArticlePagedListMetaViewModel {
  public meta: PagedListMetaViewModel;
  public data: ArticleViewModel[];
}
