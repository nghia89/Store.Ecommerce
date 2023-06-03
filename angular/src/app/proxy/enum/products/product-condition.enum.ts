import { mapEnumToOptions } from '@abp/ng.core';

export enum ProductCondition {
  New = 0,
  Refurbished = 10,
  Used = 20,
  Damaged = 30,
}

export const productConditionOptions = mapEnumToOptions(ProductCondition);
