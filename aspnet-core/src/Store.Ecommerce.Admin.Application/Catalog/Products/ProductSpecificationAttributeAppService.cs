using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;
using Store.Ecommerce.Catalog.Atrributes;
using Store.Ecommerce.Catalog.Products;

namespace Store.Ecommerce.Catalog.Products
{
    public class ProductSpecificationAttributeAppService : CrudAppService<
        ProductSpecificationAttribute,
        ProductSpecificationAttributeDto,
        int,
        PagedResultRequestDto,
        CreateUpdateProductSpecificationAttributeDto,
        CreateUpdateProductSpecificationAttributeDto>, IProductSpecificationAttributeAppService
    {

        public ProductSpecificationAttributeAppService(IRepository<ProductSpecificationAttribute, int> repository) : base(repository)
        {
        }
    }
}
