import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormDateComponent } from './components/form-date/form-date.component';
import { FormSwitchComponent } from './components/form-switch/form-switch.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormCheckComponent } from './components/form-check/form-check.component';
import { FormCheckListComponent } from './components/form-checklist/form-checklist.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormDateComponent,
    FormSwitchComponent,
    FormTextareaComponent,
    FormCheckComponent,
    FormCheckListComponent,
    FormRadioComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormDateComponent,
    FormSwitchComponent,
    FormTextareaComponent,
    FormCheckComponent,
    FormRadioComponent
  ]
})
export class DynamicFormModule {}
