using System;
using System.Collections.Generic;
using System.Text;

namespace Store.Ecommerce.Catalog.ProductCategories
{
    public class CreateUpdateProductCategoryDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Sku { get; set; }
        public string Slug { get; set; }
        public int SortOrder { get; set; }
        public string CoverPicture { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsActive { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }
        public int? ParentId { get; set; }
    }
}
