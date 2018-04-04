import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean,
  label?: string,
  name: string,
  help?: string,
  options?: any[],
  placeholder?: string,
  controlType: string,
  dataType: string,
  inputType?: string,
  validators?: string[],
  validation?: ValidatorFn[],
  value?: any,
  visible?: boolean
}
