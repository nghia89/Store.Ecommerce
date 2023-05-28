
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Store.Ecommerce.Catalog.Atrributes;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class ProductAttributeValueAppService : CrudAppService<
        ProductAttributeValue,
        ProductAttributeValueDto,
        int,
        PagedResultRequestDto,
        CreateUpdateProductAttributeValueDto,
        CreateUpdateProductAttributeValueDto>, IProductAttributeValueAppService
    {
        public ProductAttributeValueAppService(IRepository<ProductAttributeValue, int> repository) : base(repository)
        {

        }
    }
}

