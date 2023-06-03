import type { ProductType } from '../../enum/products/product-type.enum';
import type { ProductCondition } from '../../enum/products/product-condition.enum';
import type { EntityDto } from '@abp/ng.core';
import type { BaseListFilterDto } from '../../models';

export interface CreateUpdateProductDto {
  name?: string;
  slug?: string;
  sku?: string;
  sortOrder: number;
  published: boolean;
  isActive: boolean;
  categoryId: number;
  metaDescription?: string;
  metaKeywords?: string;
  description?: string;
  shortDescription?: string;
  thumbnailPicture?: string;
  sellPrice: number;
  productType: ProductType;
  productCondition: ProductCondition;
  showOnHomePage: boolean;
  manufacturerId?: string;
  isShippingEnabled: boolean;
  isFreeShipping: boolean;
  additionalShippingCharge: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  disableBuyButton: boolean;
}

export interface ProductDto {
  id?: string;
  name?: string;
  code?: string;
  slug?: string;
  sku?: string;
  sortOrder: number;
  published: boolean;
  isActive: boolean;
  categoryId: number;
  metaDescription?: string;
  metaKeywords?: string;
  description?: string;
  shortDescription?: string;
  thumbnailPicture?: string;
  sellPrice: number;
  productType: ProductType;
  productCondition: ProductCondition;
  showOnHomePage: boolean;
  manufacturerId?: string;
  isShippingEnabled: boolean;
  isFreeShipping: boolean;
  additionalShippingCharge: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  disableBuyButton: boolean;
}

export interface ProductInListDto extends EntityDto<string> {
  id?: string;
  name?: string;
  code?: string;
  slug?: string;
  sku?: string;
  sortOrder: number;
  published: boolean;
  isActive: boolean;
  categoryId: number;
  thumbnailPicture?: string;
  sellPrice: number;
  productType: ProductType;
  showOnHomePage: boolean;
  manufacturerId?: string;
  disableBuyButton: boolean;
}

export interface ProductListFilterDto extends BaseListFilterDto {
  categoryId?: number;
}
