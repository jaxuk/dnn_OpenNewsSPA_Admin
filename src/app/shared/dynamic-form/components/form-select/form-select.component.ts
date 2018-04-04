import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-select',
  styleUrls: ['form-select.component.scss'],
  template: `
    <div 
      class="dynamic-field form-group"
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <select class="form-control" [formControlName]="config.name">
        <option value="">{{ config.placeholder }}</option>
        <option *ngFor="let opt of config.options">
          {{ opt }}
        </option>
      </select>
    </div>
  `
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
