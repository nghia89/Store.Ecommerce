using System;
using Store.Ecommerce.Enum.Attributes;
using Volo.Abp.Application.Dtos;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class ProductAttributeDto : IEntityDto<int>
    {
        public Guid ProductId { get; set; }
        public int AttributeId { get; set; }
        public string Text { get; set; }
        public AttributeControlType AttributeControlTypeId { get; set; }
        public int Id { get; set; }
    }
}

