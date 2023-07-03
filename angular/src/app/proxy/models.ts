import type { PagedResultRequestDto } from '@abp/ng.core';

export interface BaseListFilterDto extends PagedResultRequestDto {
  keyword?: string;
}

export interface SavePictureDto {
  fileName?: string;
  content?: string;
}

export interface SavedPictureDto {
  id?: string;
  path?: string;
}
