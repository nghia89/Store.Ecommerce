import type { AttributeDto, CreateUpdateAttributeDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
  apiName = 'Default';
  

  create = (input: CreateUpdateAttributeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AttributeDto>({
      method: 'POST',
      url: '/api/app/attribute',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/attribute/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AttributeDto>({
      method: 'GET',
      url: `/api/app/attribute/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AttributeDto>>({
      method: 'GET',
      url: '/api/app/attribute',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAll = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, AttributeDto[]>({
      method: 'GET',
      url: '/api/app/attribute/all',
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateAttributeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AttributeDto>({
      method: 'PUT',
      url: `/api/app/attribute/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
