import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-textarea',
  styleUrls: ['form-textarea.component.scss'],
  template: `
    <div class="dynamic-field form-group" 
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <textarea
        class="form-control"
        [attr.rows]="config.rows"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name">
      </textarea>
    </div>
  `
})
export class FormTextareaComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
