using Store.Ecommerce.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Store.Ecommerce;

[DependsOn(
    typeof(EcommerceEntityFrameworkCoreTestModule)
    )]
public class EcommerceDomainTestModule : AbpModule
{

}
