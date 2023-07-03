using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Store.Ecommerce.Catalog.ProductCategories
{
    public class ProductCategoryDto : IEntityDto<int>
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
        public ProductCategoryTreeDto Parent { get; set; }
        public string TreePath { get; set; } = string.Empty;
        public int Id { get; set; }
    }
}
