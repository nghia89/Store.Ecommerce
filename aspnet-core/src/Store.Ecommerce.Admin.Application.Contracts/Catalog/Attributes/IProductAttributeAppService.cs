using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Store.Ecommerce.Catalog.Attributes
{
    public interface IProductAttributeAppService : ICrudAppService
        <
        ProductAttributeDto,
        int,
        PagedResultRequestDto,
        CreateUpdateProductAttributeDto,
        CreateUpdateProductAttributeDto>
    {
    }

}

