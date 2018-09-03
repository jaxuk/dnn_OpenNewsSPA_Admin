import { UserViewModel } from "../index";

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
  NotificationNotifyEditorsOnSubmission: boolean;
  NotificationNotifyAuthorsOnApproval: boolean;
  PageTabUrl: string;
  ImageAllowedTypes: string[];
  FileAllowedTypes: string[];
  debugEnabled: boolean;
  PermissionsEditorRoles: number;
  PermissionsAuthorRoles: number;
  PermissionsAllowEditorsToSelfPublish: boolean;
  PermissionsOnlyShowEditorsAndAuthorsForAuthorSelection: boolean;
  currentUser: UserViewModel;
}
