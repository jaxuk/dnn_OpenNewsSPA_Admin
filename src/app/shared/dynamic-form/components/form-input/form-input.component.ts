import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.scss'],
  template: `
    <div class="dynamic-field form-group" 
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <input
        class="form-control"
        [attr.type]="config.inputType"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name">
    </div>
  `
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
