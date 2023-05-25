using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Ecommerce.Catalog.Atrributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Ecommerce.Configurations.Products
{
    public class ProductSpecificationAttributeConfiguration : IEntityTypeConfiguration<ProductSpecificationAttribute>
    {
        public void Configure(EntityTypeBuilder<ProductSpecificationAttribute> builder)
        {
            builder.ToTable(EcommerceConsts.DbTablePrefix + "ProductSpecificationAttributes");
            builder.HasOne(c => c.SpecificationAttributeOption)
               .WithMany(c => c.ProductSpecificationAttributes)
               .HasForeignKey(c => c.SpecificationAttributeOptionId);

            builder.HasOne(c => c.Product)
                .WithMany(c => c.ProductSpecificationAttributes)
                .HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
