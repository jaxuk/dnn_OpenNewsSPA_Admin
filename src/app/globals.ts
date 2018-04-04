import { Injectable } from '@angular/core';
import { SettingsViewModel } from './shared';

@Injectable()
export class Globals {
  settings: SettingsViewModel = {} as SettingsViewModel;

}
