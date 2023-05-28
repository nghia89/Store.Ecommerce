using System;
namespace Store.Ecommerce.Catalog.Attributes
{
    public class CreateUpdateAttributeDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Alias { get; set; }
        public string Color { get; set; }
        public int SortOrder { get; set; }
    }
}

