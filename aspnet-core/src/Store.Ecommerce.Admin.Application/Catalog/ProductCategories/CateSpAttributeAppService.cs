using Polly;
using Store.Ecommerce.Catalog.Categories;
using Store.Ecommerce.Catalog.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;
using Volo.Abp.ObjectMapping;

namespace Store.Ecommerce.Catalog.ProductCategories
{
    public class CateSpAttributeAppService : CrudAppService<
        CategorySpecification,
        CategorySpecificationAttributeDto,
        int,
        PagedResultRequestDto,
        CreateUpdateCateSpeAttributeDto,
        CreateUpdateCateSpeAttributeDto>, ICateSpAttributeAppService
    {
        public CateSpAttributeAppService(IRepository<CategorySpecification, int> repository) : base(repository)
        {

        }

        public async Task<List<CategorySpecificationAttributeDto>> GetListByCategoryId(int categoryId)
        {
            var query = await Repository.GetQueryableAsync();
            query = query.Where(x => x.CategoryId == categoryId);
            var data = await AsyncExecuter.ToListAsync(query);

            return ObjectMapper.Map<List<CategorySpecification>, List<CategorySpecificationAttributeDto>>(data);
        }
    }
}
