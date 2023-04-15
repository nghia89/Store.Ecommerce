using Store.Ecommerce.Admin;
using Store.Ecommerce.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Store.Ecommerce.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(EcommerceEntityFrameworkCoreModule),
    typeof(EcommerceApplicationContractsModule)
    )]
public class EcommerceDbMigratorModule : AbpModule
{

}
