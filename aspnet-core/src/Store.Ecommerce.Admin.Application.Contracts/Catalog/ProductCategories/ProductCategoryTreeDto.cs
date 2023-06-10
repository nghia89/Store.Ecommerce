using System;
using System.Collections.Generic;
using System.Text;

namespace Store.Ecommerce.Catalog.ProductCategories
{
    public class ProductCategoryTreeDto
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public string ExpandedIcon { get; set; } = "pi pi-folder-open";
        public string collapsedIcon { get; set; } = "pi pi-folder";
        public List<ProductCategoryTreeDto> Children { get; set; }
    }
}
