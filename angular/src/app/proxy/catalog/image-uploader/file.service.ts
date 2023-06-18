import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SavePictureDto, SavedPictureDto } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  apiName = 'Default';
  

  savePictureByInput = (input: SavePictureDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SavedPictureDto>({
      method: 'POST',
      url: '/api/app/file/save-picture',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
