using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Store.Ecommerce.Catalog.Attributes
{
    public interface IAttributeAppService : ICrudAppService
        <
        AttributeDto,
        int,
        PagedResultRequestDto,
        CreateUpdateAttributeDto,
        CreateUpdateAttributeDto>
    {
        Task<List<AttributeDto>> GetListAllAsync();
    }

}

