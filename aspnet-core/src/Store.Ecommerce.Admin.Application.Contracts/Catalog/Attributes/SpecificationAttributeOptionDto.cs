using System;
using Volo.Abp.Application.Dtos;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class SpecificationAttributeOptionDto : IEntityDto<int>
    {
        public int SpecificationAttributeId { get; set; }
        public string Name { get; set; }
        public string Alias { get; set; }
        public int SortOrder { get; set; }
        public string Color { get; set; }
        public int Id { get; set; }
    }
}

