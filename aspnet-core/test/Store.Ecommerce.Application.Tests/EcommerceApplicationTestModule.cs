using Volo.Abp.Modularity;

namespace Store.Ecommerce;

[DependsOn(
    typeof(EcommerceApplicationModule),
    typeof(EcommerceDomainTestModule)
    )]
public class EcommerceApplicationTestModule : AbpModule
{

}
