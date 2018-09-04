import { FileViewModel, TagViewModel, CategoryViewModel } from './';
export class ArticleViewModel {
  public ArticleID: number;
  public AuthorID: number;
  public ApproverID: number;
  public CreatedDate: Date;
  public LastUpdated: Date;
  public Title: string;
  public IsApproved: boolean;
  public IsDraft: boolean;
  public IsDeleted: boolean;
  public AutoArchive: boolean;
  public NumOfViews: number;
  public StartDate: Date;
  public EndDate: Date;
  public ModuleID: number;
  public IsFeatured: boolean;
  public URL: string;
  public Summary: string;
  public CommentCount: number;
  public MetaTitle: string;
  public MetaDescription: string;
  public MetaKeywords: string;
  public PageHeadText: string;
  public ShortURL: string;
  public RssGuid: string;
  public Body: string
  public Files: Array<FileViewModel>;
  public Images: Array<FileViewModel>;
  public Tags: Array<TagViewModel>;
  public Categories: Array<CategoryViewModel>;
  public CustomTypes: any;
  public Status: string;
  public Actions: Array<string>;
}
