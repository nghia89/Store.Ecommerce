
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Store.Ecommerce.Catalog.Atrributes;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class AttributeAppService : CrudAppService<
        Attribute,
        AttributeDto,
        int,
        PagedResultRequestDto,
        CreateUpdateAttributeDto,
        CreateUpdateAttributeDto>, IAttributeAppService
    {
        public AttributeAppService(IRepository<Attribute, int> repository) : base(repository)
        {

        }

        public async Task<List<AttributeDto>> GetListAllAsync()
        {
            var data = await Repository.GetListAsync();
            return ObjectMapper.Map<List<Attribute>, List<AttributeDto>>(data);
        }
    }
}

