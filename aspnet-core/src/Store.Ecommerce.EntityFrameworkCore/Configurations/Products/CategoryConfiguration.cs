using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Ecommerce.Catalog.Categories;

namespace Store.Ecommerce.Configurations.Products
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable(EcommerceConsts.DbTablePrefix + "categories");
            builder.Property(x => x.Name).HasMaxLength(250).IsRequired();
            builder.Property(x => x.Slug).HasMaxLength(250).IsRequired();
            builder.Property(x => x.CoverPicture).HasMaxLength(250);
            builder.Property(x => x.MetaDescription).HasMaxLength(250);
        }
    }
}

