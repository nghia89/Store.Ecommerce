﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Atrributes
{
    public class ProductVariantAttributeValue : AuditedAggregateRoot<int>
    {
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Color { get; set; }
        public int ProductVariantAttributeId { get; set; }
        public int SortOrder { get; set; }
    }
}
