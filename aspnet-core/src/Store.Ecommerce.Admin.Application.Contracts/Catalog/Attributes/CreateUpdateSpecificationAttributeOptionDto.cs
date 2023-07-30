using System;
namespace Store.Ecommerce.Catalog.Attributes
{
    public class CreateUpdateSpecificationAttributeOptionDto
    {
        public string Name { get; set; }
        public string Alias { get; set; }
        public int SortOrder { get; set; }
        public bool ShowOnProductPage { get; set; }
        public string Color { get; set; }
        public int SpecificationAttributeId { get; set; }
    }
}

