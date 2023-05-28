using System;
using Store.Ecommerce.Enum.Attributes;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class CreateUpdateProductAttributeValueDto
    {
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Color { get; set; }
        public int ProductAttributeId { get; set; }
        public int SortOrder { get; set; }
        public decimal PriceAdjustment { get; set; }
        public int Quantity { get; set; }
        public string RawAttributes { get; set; }
    }
}

