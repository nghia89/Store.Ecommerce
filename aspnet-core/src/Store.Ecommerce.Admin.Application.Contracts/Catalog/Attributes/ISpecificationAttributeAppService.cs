using System;
using System.Threading.Tasks;
using Store.Ecommerce.Catalog.Products;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Store.Ecommerce.Catalog.Attributes
{
    public interface ISpecificationAttributeAppService : ICrudAppService
        <
        SpecificationAttributeDto,
        int,
        PagedResultRequestDto,
        CreateUpdateSpecificationAttributeDto,
        CreateUpdateSpecificationAttributeDto>
    {
        Task<PagedResultDto<SpecificationAttributeDto>> GetListFilterAsync(BaseListFilterDto input);
    }

}

