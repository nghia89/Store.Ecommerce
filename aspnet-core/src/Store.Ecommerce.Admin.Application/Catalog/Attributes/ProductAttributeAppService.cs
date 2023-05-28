
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Store.Ecommerce.Catalog.Atrributes;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class ProductAttributeAppService : CrudAppService<
        ProductAttribute,
        ProductAttributeDto,
        int,
        PagedResultRequestDto,
        CreateUpdateProductAttributeDto,
        CreateUpdateProductAttributeDto>, IProductAttributeAppService
    {
        public ProductAttributeAppService(IRepository<ProductAttribute, int> repository) : base(repository)
        {

        }
    }
}

