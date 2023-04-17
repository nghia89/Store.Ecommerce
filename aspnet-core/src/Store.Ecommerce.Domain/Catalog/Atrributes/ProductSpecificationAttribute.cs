using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Atrributes
{
   public class ProductSpecificationAttribute : AuditedAggregateRoot<int>
    {
        public int SpecificationAttributeOptionId { get; set; }
        public Guid ProductId { get; set; }
        public bool? ShowOnProductPage { get; set; }
        public int SortOrder { get; set; }
    }
}
