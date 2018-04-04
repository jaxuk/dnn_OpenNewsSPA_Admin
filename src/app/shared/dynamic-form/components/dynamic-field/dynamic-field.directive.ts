import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormButtonComponent } from '../form-button/form-button.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormSelectComponent } from '../form-select/form-select.component';
import { FormDateComponent } from '../form-date/form-date.component';
import { FormSwitchComponent } from '../form-switch/form-switch.component';
import { FormTextareaComponent } from '../form-textarea/form-textarea.component';
import { FormCheckComponent } from '../form-check/form-check.component';
import { FormRadioComponent } from '../form-radio/form-radio.component';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

const components: { [controlType: string]: Type<Field>} = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent,
  check: FormCheckComponent,
  radio: FormRadioComponent,
  textarea: FormTextareaComponent,
  switch: FormSwitchComponent,
  date: FormDateComponent,
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.controlType]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.controlType}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.controlType]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
