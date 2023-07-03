using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Store.Ecommerce.Catalog.Atrributes;
using Store.Ecommerce.Catalog.Products;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Categories
{
    public class Category : FullAuditedAggregateRoot<int>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Slug { get; set; }
        public int SortOrder { get; set; }
        public string CoverPicture { get; set; }
        public string CoverPictureId { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsActive { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }
        public int? ParentId { get; set; }
        public string TreePath { get; set; } = string.Empty;

        public ICollection<Product> Products { get; set; }
    }
}
