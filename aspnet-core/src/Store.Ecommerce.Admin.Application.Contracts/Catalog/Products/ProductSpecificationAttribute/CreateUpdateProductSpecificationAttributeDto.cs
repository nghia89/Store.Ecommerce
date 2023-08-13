using Store.Ecommerce.Enum.Products;
using System;
using System.Collections.Generic;
using System.Text;

namespace Store.Ecommerce.Catalog.Products
{
    public class CreateUpdateProductSpecificationAttributeDto
    {
        public int SpecificationAttributeOptionId { get; set; }
        public Guid ProductId { get; set; }
        public bool? ShowOnProductPage { get; set; }
        public int SortOrder { get; set; }
    }
}
