export enum attributeTypesEnum {
  'STRING',
  'LONG_STRING',
  'NUMBER',
  'DATE',
  'BOOLEAN',
}

export const attributeTypes = [
  'STRING',
  'LONG_STRING',
  'NUMBER',
  'DATE',
  'BOOLEAN',
];

export interface ProductInterfaceAttributes {
  name: string;
  type: attributeTypesEnum;
}

export interface ProductTypeI {
  name: string;
  attributes: ProductInterfaceAttributes[];
}
