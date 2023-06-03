import { mapEnumToOptions } from '@abp/ng.core';

export enum ProductType {
  Single = 1,
}

export const productTypeOptions = mapEnumToOptions(ProductType);
