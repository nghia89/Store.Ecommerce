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
    public class AttributeConfiguration : IEntityTypeConfiguration<Catalog.Atrributes.Attribute>
    {
        public void Configure(EntityTypeBuilder<Catalog.Atrributes.Attribute> builder)
        {
            builder.ToTable(EcommerceConsts.DbTablePrefix + "Attributes");
            builder.Property(x => x.Name).HasMaxLength(250).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(250);
            builder.Property(x => x.Alias).HasMaxLength(250);
            builder.Property(x => x.Color).HasMaxLength(250);
        }
    }
}
