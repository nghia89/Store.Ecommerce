using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Ecommerce.Catalog.Categories;
using Store.Ecommerce.Catalog.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Ecommerce.Configurations.Products
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable(EcommerceConsts.DbTablePrefix + "Products");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(250).IsRequired();
            builder.Property(x => x.Slug)
              .HasMaxLength(250).IsRequired();
            builder.Property(x => x.ThumbnailPicture)
           .HasMaxLength(250);
            builder.Property(x => x.ShortDescription)
             .HasMaxLength(250);
            builder.Property(x => x.MetaDescription)
             .HasMaxLength(250);
            builder.Property(x => x.MetaKeywords)
            .HasMaxLength(250);
            builder.Property(x => x.SKU).HasMaxLength(50).IsUnicode(false);

            builder.HasIndex(x => new { x.Name, x.SKU });
            builder.HasOne<Category>(x => x.Category).WithMany(m => m.Products).HasForeignKey(k => k.CategoryId);
        }
    }
}
