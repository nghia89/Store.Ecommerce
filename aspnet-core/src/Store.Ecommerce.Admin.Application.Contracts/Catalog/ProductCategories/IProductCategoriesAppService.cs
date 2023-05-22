using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Store.Ecommerce.Catalog.ProductCategories
{
    public interface IProductCategoriesAppService : ICrudAppService
      <ProductCategoryDto,
      Guid,
      PagedResultRequestDto,
      CreateUpdateProductCategoryDto,
      CreateUpdateProductCategoryDto>
    {
        Task<List<ProductCategoryInListDto>> GetListAllAsync();
        Task<PagedResultDto<ProductCategoryInListDto>> GetListFilterAsync(BaseListFilterDto input);
    }
}
