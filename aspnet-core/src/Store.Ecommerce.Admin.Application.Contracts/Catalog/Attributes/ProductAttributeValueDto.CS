using System;
using Store.Ecommerce.Enum.Attributes;
using Volo.Abp.Application.Dtos;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class ProductAttributeValueDto : IEntityDto<int>
    {
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Color { get; set; }
        public int ProductAttributeId { get; set; }
        public int SortOrder { get; set; }
        public decimal PriceAdjustment { get; set; }
        public int Quantity { get; set; }
        public string RawAttributes { get; set; }
        public int Id { get; set; }
    }
}

