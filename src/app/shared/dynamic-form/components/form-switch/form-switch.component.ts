import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-swtich',
  styleUrls: ['form-swtich.component.scss'],
  template: `
    <div class="dynamic-field form-group" 
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <div class="btn-group btn-group-toggle" ngbRadioGroup [formControlName]="config.name">
        <label ngbButtonLabel class="btn-outline-primary">
          <input ngbButton type="radio" [value]=true> Yes
        </label>
        <label ngbButtonLabel class="btn-outline-secondary">
          <input ngbButton type="radio" [value]=false checked> No
        </label>
      </div>
    </div>
  `
})
export class FormSwitchComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
