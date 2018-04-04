import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-radio',
  styleUrls: ['form-radio.component.scss'],
  template: `
    <div 
      class="dynamic-field form-group"
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <div class="form-check" *ngFor="let opt of config.options; let i = index">
        <input class="form-check-input" type="radio" [formControlName]="config.name"
          id="dynfld{{config.name}}{{i}}" value="{{ opt }}">
        <label class="form-check-label" for="dynfld{{config.name}}{{i}}">
          {{ opt }}
        </label>
      </div>
    </div>
  `
})
export class FormRadioComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
