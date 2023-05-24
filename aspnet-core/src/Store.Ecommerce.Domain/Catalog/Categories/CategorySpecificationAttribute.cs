using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Categories
{
    public class CategorySpecificationAttribute : AuditedAggregateRoot<int>
    {
        public Guid CategoryId { get; set; }
        public int SpecificationAttributeId { get; set; }
    }
}

