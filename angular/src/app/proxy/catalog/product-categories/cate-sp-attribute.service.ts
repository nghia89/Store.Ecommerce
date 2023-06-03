import type { CategorySpecificationAttributeDto, CeateUpdateCateSpeAttributeDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CateSpAttributeService {
  apiName = 'Default';
  

  create = (input: CeateUpdateCateSpeAttributeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CategorySpecificationAttributeDto>({
      method: 'POST',
      url: '/api/app/cate-sp-attribute',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/cate-sp-attribute/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CategorySpecificationAttributeDto>({
      method: 'GET',
      url: `/api/app/cate-sp-attribute/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CategorySpecificationAttributeDto>>({
      method: 'GET',
      url: '/api/app/cate-sp-attribute',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CeateUpdateCateSpeAttributeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CategorySpecificationAttributeDto>({
      method: 'PUT',
      url: `/api/app/cate-sp-attribute/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
