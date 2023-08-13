import type { CreateUpdateProductSpecificationAttributeDto, ProductSpecificationAttributeDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductSpecificationAttributeService {
  apiName = 'Default';
  

  create = (input: CreateUpdateProductSpecificationAttributeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductSpecificationAttributeDto>({
      method: 'POST',
      url: '/api/app/product-specification-attribute',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/product-specification-attribute/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductSpecificationAttributeDto>({
      method: 'GET',
      url: `/api/app/product-specification-attribute/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ProductSpecificationAttributeDto>>({
      method: 'GET',
      url: '/api/app/product-specification-attribute',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateProductSpecificationAttributeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductSpecificationAttributeDto>({
      method: 'PUT',
      url: `/api/app/product-specification-attribute/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
