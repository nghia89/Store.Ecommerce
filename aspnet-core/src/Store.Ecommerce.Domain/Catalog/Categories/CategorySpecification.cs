using System;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Categories
{
    public class CategorySpecification : Entity<int>
    {
        public int CategoryId { get; set; }
        public int SpecificationAttributeId { get; set; }

    }
}

