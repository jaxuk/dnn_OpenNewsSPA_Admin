import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-check',
  styleUrls: ['form-check.component.scss'],
  template: `
    <div 
      class="dynamic-field form-group"
      [formGroup]="group">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" [formControlName]="config.name"
          id="dynfld{{config.name}}" value="true">
        <label class="form-check-label" for="dynfld{{config.name}}">
          {{ config.label }}
        </label>
      </div>
    </div>
  `
})
export class FormCheckComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
