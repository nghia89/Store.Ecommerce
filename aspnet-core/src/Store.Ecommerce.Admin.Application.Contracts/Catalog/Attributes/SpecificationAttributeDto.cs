using System;
using Volo.Abp.Application.Dtos;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class SpecificationAttributeDto : IEntityDto<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Alias { get; set; }
        public string Description { get; set; }
        public int SortOrder { get; set; }
        public bool ShowOnProductPage { get; set; }
    }
}

