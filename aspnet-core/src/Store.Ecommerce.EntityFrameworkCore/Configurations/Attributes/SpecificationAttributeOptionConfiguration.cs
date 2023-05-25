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
    public class SpecificationAttributeOptionConfiguration : IEntityTypeConfiguration<SpecificationAttributeOption>
    {
        public void Configure(EntityTypeBuilder<SpecificationAttributeOption> builder)
        {
            builder.ToTable(EcommerceConsts.DbTablePrefix+ "SpecificationAttributeOptions");
            builder.HasOne(c => c.SpecificationAttribute)
               .WithMany(c => c.SpecificationAttributeOptions)
               .HasForeignKey(c => c.SpecificationAttributeId);
        }
    }
}
