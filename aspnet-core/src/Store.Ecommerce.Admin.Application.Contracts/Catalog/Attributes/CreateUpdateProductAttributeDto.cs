using System;
using Store.Ecommerce.Enum.Attributes;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class CreateUpdateProductAttributeDto
    {
        public Guid ProductId { get; set; }
        public int AttributeId { get; set; }
        public string Text { get; set; }
        public AttributeControlType AttributeControlTypeId { get; set; }
    }
}

