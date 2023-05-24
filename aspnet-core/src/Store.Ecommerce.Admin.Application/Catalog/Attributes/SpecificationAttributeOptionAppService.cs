﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Internal.Mappers;
using Store.Ecommerce.Catalog.Atrributes;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class SpecificationAttributeOptionAppService : CrudAppService<
        SpecificationAttributeOption,
        SpecificationAttributeOptionDto,
        int,
        PagedResultRequestDto,
        CreateUpdateSpecificationAttributeOptionDto,
        CreateUpdateSpecificationAttributeOptionDto
        >, ISpecificationAttributeOptionAppService
    {
        public SpecificationAttributeOptionAppService(IRepository<SpecificationAttributeOption, int> repository) : base(repository)
        {
        }

        public async Task<List<SpecificationAttributeOptionDto>> GetListFilterAsync(int specificationAttributeId, string keyword)
        {
            var query = await Repository.GetQueryableAsync();
            query = query.WhereIf(!string.IsNullOrWhiteSpace(keyword), x => x.Name.Contains(keyword));
            query = query.WhereIf(!string.IsNullOrWhiteSpace(keyword), x => x.SpecificationAttributeId == specificationAttributeId);

            var data = await AsyncExecuter.ToListAsync(query);
            return ObjectMapper.Map<List<SpecificationAttributeOption>, List<SpecificationAttributeOptionDto>>(data);
        }
    }
}
