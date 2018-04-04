export interface SettingsViewModel {
  BasicArticlesPerPage: number;
  BasicRenderingTemplate: string;
  BasicServerTimeZone: string;
  BasicSortBy: string;
  BasicSortDirection: string;
  BasicAllowCoreSearchIntegration: boolean;
  CategoryDefaultCategories: number[];
  CategoryIncludeInBreadcrumb: boolean;
  CategoryRequireCategory: boolean;
  FileDefaultFileFolder: string;
  ImageDefaultImageFolder: string;
  SEORemovePagePathFromURL: boolean;
  NotificationNotifyApproversOnSubmission: boolean;
  NotificationNotifyApproversOnApproval: boolean;
  PageTabUrl: string;
  ImageAllowedTypes: string[];
  FileAllowedTypes: string[];
  debugEnabled: boolean;
}
