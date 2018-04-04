import { FieldConfig } from '../dynamic-form/models/field-config.interface';

export class CustomDefModel {
  public DefId: number;
  public Name: string;
  public TypeName: string;
  public Required: boolean;
  public Fields: FieldConfig[];
}
