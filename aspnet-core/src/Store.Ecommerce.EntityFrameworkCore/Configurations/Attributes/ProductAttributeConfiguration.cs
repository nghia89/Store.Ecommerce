using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Ecommerce.Catalog.Atrributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Ecommerce.Configurations.Attributes
{
    public class ProductAttributeConfiguration : IEntityTypeConfiguration<ProductAttribute>
    {
        public void Configure(EntityTypeBuilder<ProductAttribute> builder)
        {
            builder.ToTable(EcommerceConsts.DbTablePrefix + "ProductAttributes");
            builder.Property(x => x.Text).HasMaxLength(250).IsRequired();
            builder.HasIndex(x => new { x.ProductId, x.AttributeId });

            builder.HasOne(x => x.Product)
                .WithMany(m => m.ProductAttributes)
                .HasForeignKey(k => k.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(c => c.Attribute)
                .WithMany()
                .HasForeignKey(c => c.AttributeId);

            builder.HasOne(x => x.ProductAttributeValue)
                .WithOne(m => m.ProductAttribute).
                HasForeignKey<ProductAttributeValue>(k => k.ProductAttributeId);
        }
    }
}
