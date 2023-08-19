using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Store.Ecommerce.Catalog.Products;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Store.Ecommerce.Catalog.Attributes
{
    public interface ISpecificationAttributeOptionAppService : ICrudAppService
        <
        SpecificationAttributeOptionDto,
        int,
        PagedResultRequestDto,
        CreateUpdateSpecificationAttributeOptionDto,
        CreateUpdateSpecificationAttributeOptionDto>
    {
        Task<List<SpecificationAttributeOptionDto>> GetListFilterAsync(int specificationAttributeId, string keyword);
        Task<PagedResultDto<SpecificationAttributeOptionDto>> GetListPagingAsync(int specificationAttributeId, BaseListFilterDto input);
    }

}

