using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Store.Ecommerce.Catalog.Attributes
{
    public interface IProductAttributeValueAppService : ICrudAppService
        <
        ProductAttributeValueDto,
        int,
        PagedResultRequestDto,
        CreateUpdateProductAttributeValueDto,
        CreateUpdateProductAttributeValueDto>
    {
    }

}

