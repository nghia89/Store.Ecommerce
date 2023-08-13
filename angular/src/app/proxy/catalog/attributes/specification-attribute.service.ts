import type { CreateUpdateSpecificationAttributeDto, SpecificationAttributeDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BaseListFilterDto } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class SpecificationAttributeService {
  apiName = 'Default';
  

  create = (input: CreateUpdateSpecificationAttributeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SpecificationAttributeDto>({
      method: 'POST',
      url: '/api/app/specification-attribute',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/specification-attribute/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SpecificationAttributeDto>({
      method: 'GET',
      url: `/api/app/specification-attribute/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<SpecificationAttributeDto>>({
      method: 'GET',
      url: '/api/app/specification-attribute',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAll = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, SpecificationAttributeDto[]>({
      method: 'GET',
      url: '/api/app/specification-attribute/all',
    },
    { apiName: this.apiName,...config });
  

  getListFilter = (input: BaseListFilterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<SpecificationAttributeDto>>({
      method: 'GET',
      url: '/api/app/specification-attribute/filter',
      params: { keyword: input.keyword, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateSpecificationAttributeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SpecificationAttributeDto>({
      method: 'PUT',
      url: `/api/app/specification-attribute/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
