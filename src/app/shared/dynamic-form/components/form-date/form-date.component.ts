import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-date',
  styleUrls: ['form-date.component.scss'],
  template: `
    <div class="dynamic-field form-group" 
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <div class="input-group date-time">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" (click)="d.toggle()" type="button">
            <i class="far fa-calendar-alt"></i>
          </button>
        </div>
        <input class="form-control" [attr.placeholder]="config.placeholder" [formControlName]="config.name" ngbDatepicker #d="ngbDatepicker">
      </div>
    </div>
  `
})
export class FormDateComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
