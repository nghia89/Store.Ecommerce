using Store.Ecommerce.Enum.Products;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Products
{
    public class Product : FullAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Slug { get; set; }
        public string SKU { get; set; }
        public int SortOrder { get; set; }
        public bool Published { get; set; }
        public bool IsActive { get; set; }
        public Guid CategoryId { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string ThumbnailPicture { get; set; }
        public double SellPrice { get; set; }
        public ProductType ProductType { get; set; }
        public ProductCondition ProductCondition { get; set; }
        public bool ShowOnHomePage { get; set; }
        public Guid ManufacturerId { get; set; }
        public bool IsShippingEnabled { get; set; }
        public bool IsFreeShipping { get; set; }
        /// <summary>
        /// Gets or sets the additional shipping charge.
        /// </summary>
        public decimal AdditionalShippingCharge { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public decimal Length { get; set; }
        public decimal Weight { get; set; }
        public bool DisableBuyButton { get; set; }
    }
}
