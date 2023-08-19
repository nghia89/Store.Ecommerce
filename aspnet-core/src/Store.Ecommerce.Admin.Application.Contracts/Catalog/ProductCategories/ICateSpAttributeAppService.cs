using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Store.Ecommerce.Catalog.ProductCategories
{
    public interface ICateSpAttributeAppService : ICrudAppService<
        CategorySpecificationAttributeDto,
        int,
        PagedResultRequestDto,
        CreateUpdateCateSpeAttributeDto,
        CreateUpdateCateSpeAttributeDto>
    {
        Task<List<CategorySpecificationAttributeDto>> GetListByCategoryId(int categoryId);
    }
}

