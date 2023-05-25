using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Ecommerce.Catalog.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Ecommerce.Configurations.Products
{
    public class CategorySpecificationConfiguration : IEntityTypeConfiguration<CategorySpecification>
    {
        public void Configure(EntityTypeBuilder<CategorySpecification> builder)
        {
            builder.ToTable(EcommerceConsts.DbTablePrefix + "CategorySpecifications");
            builder.HasIndex(x => new { x.CategoryId, x.SpecificationAttributeId });
        }
    }
}
