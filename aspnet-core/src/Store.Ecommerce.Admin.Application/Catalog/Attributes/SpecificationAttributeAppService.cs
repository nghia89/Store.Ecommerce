using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Store.Ecommerce.Catalog.Atrributes;
using Store.Ecommerce.Catalog.Products;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class SpecificationAttributeAppService : CrudAppService<
        SpecificationAttribute,
        SpecificationAttributeDto,
        int,
        PagedResultRequestDto,
        CreateUpdateSpecificationAttributeDto,
        CreateUpdateSpecificationAttributeDto>, ISpecificationAttributeAppService
    {
        public SpecificationAttributeAppService(IRepository<SpecificationAttribute, int> repository) : base(repository)
        {

        }

        public async Task<PagedResultDto<SpecificationAttributeDto>> GetListFilterAsync(BaseListFilterDto input)
        {
            var query = await Repository.GetQueryableAsync();
            query = query.WhereIf(!string.IsNullOrWhiteSpace(input.Keyword), x => x.Name.Contains(input.Keyword));

            var totalCount = await AsyncExecuter.LongCountAsync(query);
            var data = await AsyncExecuter.ToListAsync(query.Skip(input.SkipCount).Take(input.MaxResultCount));

            return new PagedResultDto<SpecificationAttributeDto>(totalCount, ObjectMapper.Map<List<SpecificationAttribute>, List<SpecificationAttributeDto>>(data));
        }
    }
}

