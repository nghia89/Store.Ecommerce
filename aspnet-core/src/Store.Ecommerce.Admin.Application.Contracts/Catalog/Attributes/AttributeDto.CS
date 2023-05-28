using System;
using Volo.Abp.Application.Dtos;

namespace Store.Ecommerce.Catalog.Attributes
{
    public class AttributeDto : IEntityDto<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Alias { get; set; }
        public string Color { get; set; }
        public int SortOrder { get; set; }
    }
}

