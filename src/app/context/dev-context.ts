// This lets you configure test-values during development.

import { ContextInfo } from './context-info';
import { Injectable } from '@angular/core';

@Injectable()
export class DevContext implements ContextInfo {
  ignoreMissingServicesFramework = false;
  forceUse: boolean = true;

  moduleId: number = 542;
  tabId: number = 137;

  antiForgeryToken: string = 'ThisIsaTestAntiForgeryToken';
  path: string = '';
}
