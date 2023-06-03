import type { AttributeControlType } from '../../enum/attributes/attribute-control-type.enum';

export interface AttributeDto {
  id: number;
  name?: string;
  description?: string;
  alias?: string;
  color?: string;
  sortOrder: number;
}

export interface CreateUpdateAttributeDto {
  name?: string;
  description?: string;
  alias?: string;
  color?: string;
  sortOrder: number;
}

export interface CreateUpdateProductAttributeDto {
  productId?: string;
  attributeId: number;
  text?: string;
  attributeControlTypeId: AttributeControlType;
}

export interface CreateUpdateProductAttributeValueDto {
  name?: string;
  alias?: string;
  color?: string;
  productAttributeId: number;
  sortOrder: number;
  priceAdjustment: number;
  quantity: number;
  rawAttributes?: string;
}

export interface CreateUpdateSpecificationAttributeDto {
  name?: string;
  alias?: string;
  description?: string;
  sortOrder: number;
  showOnProductPage: boolean;
}

export interface CreateUpdateSpecificationAttributeOptionDto {
  name?: string;
  alias?: string;
  description?: string;
  sortOrder: number;
  showOnProductPage: boolean;
}

export interface ProductAttributeDto {
  productId?: string;
  attributeId: number;
  text?: string;
  attributeControlTypeId: AttributeControlType;
  id: number;
}

export interface ProductAttributeValueDto {
  name?: string;
  alias?: string;
  color?: string;
  productAttributeId: number;
  sortOrder: number;
  priceAdjustment: number;
  quantity: number;
  rawAttributes?: string;
  id: number;
}

export interface SpecificationAttributeDto {
  id: number;
  name?: string;
  alias?: string;
  description?: string;
  sortOrder: number;
  showOnProductPage: boolean;
}

export interface SpecificationAttributeOptionDto {
  specificationAttributeId: number;
  name?: string;
  alias?: string;
  sortOrder: number;
  color?: string;
  id: number;
}
