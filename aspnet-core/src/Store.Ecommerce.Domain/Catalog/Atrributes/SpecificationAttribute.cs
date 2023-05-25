using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Atrributes
{
    public class SpecificationAttribute : AuditedAggregateRoot<int>
    {
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Description { get; set; }
        public int SortOrder { get; set; }
        public bool ShowOnProductPage { get; set; }
        public Collection<SpecificationAttributeOption> SpecificationAttributeOptions { get; set; }
    }
}
