using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Store.Ecommerce.Catalog.Products
{
    public interface IProductSpecificationAttributeAppService : ICrudAppService
        <ProductSpecificationAttributeDto,
        int,
        PagedResultRequestDto,
        CreateUpdateProductSpecificationAttributeDto,
        CreateUpdateProductSpecificationAttributeDto>
    {

    }
}
