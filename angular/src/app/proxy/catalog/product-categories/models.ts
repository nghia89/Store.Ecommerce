import type { EntityDto } from '@abp/ng.core';

export interface CategorySpecificationAttributeDto {
  categoryId: number;
  specificationAttributeId: number;
  id: number;
}

export interface CeateUpdateCateSpeAttributeDto {
  categoryId: number;
  specificationAttributeId: number;
}

export interface CreateUpdateProductCategoryDto {
  name?: string;
  code?: string;
  slug?: string;
  sortOrder: number;
  coverPicture?: string;
  coverPictureId?: string;
  isFeatured: boolean;
  isActive: boolean;
  metaDescription?: string;
  metaTitle?: string;
  parentId?: number;
}

export interface ProductCategoryDto {
  name?: string;
  code?: string;
  slug?: string;
  sortOrder: number;
  coverPicture?: string;
  coverPictureId?: string;
  isFeatured: boolean;
  isActive: boolean;
  metaDescription?: string;
  metaTitle?: string;
  parentId?: number;
  parent: ProductCategoryTreeDto;
  treePath?: string;
  id: number;
}

export interface ProductCategoryInListDto extends EntityDto<number> {
  name?: string;
  code?: string;
  slug?: string;
  sortOrder: number;
  coverPicture?: string;
  coverPictureId?: string;
  isFeatured: boolean;
  isActive: boolean;
  metaDescription?: string;
  metaTitle?: string;
  parentId?: number;
  id: number;
  treePath?: string;
}

export interface ProductCategoryTreeDto {
  id: number;
  label?: string;
  parent?: number;
  expandedIcon?: string;
  collapsedIcon?: string;
  children: ProductCategoryTreeDto[];
}
