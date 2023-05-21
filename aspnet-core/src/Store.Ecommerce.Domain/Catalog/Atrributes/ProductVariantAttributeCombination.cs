using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Atrributes
{
    public class ProductVariantAttributeCombination : AuditedAggregateRoot<int>
    {
        public int ProductId { get; set; }
        [StringLength(400)]
        public string Sku { get; set; }
        public decimal PriceAdjustment { get; set; }
        public int Quantity { get; set; }
        public string RawAttributes { get; set; }
    }
}
