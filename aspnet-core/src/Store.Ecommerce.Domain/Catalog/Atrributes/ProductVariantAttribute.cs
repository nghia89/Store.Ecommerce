using Store.Ecommerce.Enum.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Atrributes
{
    public class ProductVariantAttribute : AuditedAggregateRoot<int>
    {
        public Guid ProductId { get; set; }
        public int ProductAttributeId { get; set; }
        public bool IsRequired { get; set; }
        public AttributeControlType AttributeControlTypeId { get; set; }
    }
}
