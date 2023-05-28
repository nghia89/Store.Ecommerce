using Store.Ecommerce.Catalog.Products;
using Store.Ecommerce.Enum.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Atrributes
{
    public class ProductAttribute : AuditedAggregateRoot<int>
    {
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public int AttributeId { get; set; }
        public Attribute Attribute { get; set; }
        public bool IsRequired { get; set; }
        public string Text { get; set; }
        public AttributeControlType AttributeControlTypeId { get; set; }
    }
}
