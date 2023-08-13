using Store.Ecommerce.Enum.Products;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Store.Ecommerce.Catalog.Products
{
    public class ProductSpecificationAttributeDto: IEntityDto<int>
    {
        public int Id{get;set;}
        public int SpecificationAttributeOptionId { get; set; }
        public Guid ProductId { get; set; }
        public bool? ShowOnProductPage { get; set; }
        public int SortOrder { get; set; }
    }
}
