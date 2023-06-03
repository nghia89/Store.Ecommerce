import type { CreateUpdateSpecificationAttributeOptionDto, SpecificationAttributeOptionDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpecificationAttributeOptionService {
  apiName = 'Default';
  

  create = (input: CreateUpdateSpecificationAttributeOptionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SpecificationAttributeOptionDto>({
      method: 'POST',
      url: '/api/app/specification-attribute-option',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/specification-attribute-option/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SpecificationAttributeOptionDto>({
      method: 'GET',
      url: `/api/app/specification-attribute-option/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<SpecificationAttributeOptionDto>>({
      method: 'GET',
      url: '/api/app/specification-attribute-option',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListFilter = (specificationAttributeId: number, keyword: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SpecificationAttributeOptionDto[]>({
      method: 'GET',
      url: `/api/app/specification-attribute-option/filter/${specificationAttributeId}`,
      params: { keyword },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateSpecificationAttributeOptionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SpecificationAttributeOptionDto>({
      method: 'PUT',
      url: `/api/app/specification-attribute-option/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
