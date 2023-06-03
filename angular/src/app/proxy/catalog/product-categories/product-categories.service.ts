import type { CreateUpdateProductCategoryDto, ProductCategoryDto, ProductCategoryInListDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesService {
  apiName = 'Default';
  

  create = (input: CreateUpdateProductCategoryDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductCategoryDto>({
      method: 'POST',
      url: '/api/app/product-categories',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/product-categories/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductCategoryDto>({
      method: 'GET',
      url: `/api/app/product-categories/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ProductCategoryDto>>({
      method: 'GET',
      url: '/api/app/product-categories',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAll = (Keyword: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductCategoryInListDto[]>({
      method: 'GET',
      url: '/api/app/product-categories/all',
      params: { keyword: Keyword },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateProductCategoryDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductCategoryDto>({
      method: 'PUT',
      url: `/api/app/product-categories/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
