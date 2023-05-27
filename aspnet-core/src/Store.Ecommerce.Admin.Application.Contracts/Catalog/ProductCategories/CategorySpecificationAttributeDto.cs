using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Store.Ecommerce.Catalog.ProductCategories
{
    public class CategorySpecificationAttributeDto : IEntityDto<int>
    {
        public int CategoryId { get; set; }
        public int SpecificationAttributeId { get; set; }
        public int Id { get; set; }
    }
}
