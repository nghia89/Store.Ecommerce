using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Store.Ecommerce.MultiTenancy;
using Volo.Abp.AuditLogging;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Emailing;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.MultiTenancy;
using Volo.Abp.OpenIddict;
using Volo.Abp.PermissionManagement.Identity;
using Volo.Abp.PermissionManagement.OpenIddict;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Volo.Abp.BlobStoring;
using Microsoft.Extensions.Configuration;
using Volo.Abp.BlobStoring.Azure;
using Store.Ecommerce.Settings;

namespace Store.Ecommerce;

[DependsOn(
    typeof(EcommerceDomainSharedModule),
    typeof(AbpAuditLoggingDomainModule),
    typeof(AbpBackgroundJobsDomainModule),
    typeof(AbpFeatureManagementDomainModule),
    typeof(AbpIdentityDomainModule),
    typeof(AbpOpenIddictDomainModule),
    typeof(AbpPermissionManagementDomainOpenIddictModule),
    typeof(AbpPermissionManagementDomainIdentityModule),
    typeof(AbpSettingManagementDomainModule),
    typeof(AbpTenantManagementDomainModule),
    typeof(AbpEmailingModule)
)]
[DependsOn(typeof(AbpBlobStoringModule))]
[DependsOn(typeof(AbpBlobStoringAzureModule))]
public class EcommerceDomainModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpLocalizationOptions>(options =>
        {
            options.Languages.Add(new LanguageInfo("en", "en", "English", "gb"));
            options.Languages.Add(new LanguageInfo("vi", "vi", "Vietnamese", "vi"));

        });

        Configure<AbpMultiTenancyOptions>(options =>
        {
            options.IsEnabled = MultiTenancyConsts.IsEnabled;
        });
        var configuration = context.Services.GetConfiguration();
        ConfigureOptions(context, configuration);
        ConfigureAbpBlobStoringOptions(configuration);

#if DEBUG
        context.Services.Replace(ServiceDescriptor.Singleton<IEmailSender, NullEmailSender>());
#endif
    }

    private void ConfigureAbpBlobStoringOptions(IConfiguration configuration)
    {
        Configure<AbpBlobStoringOptions>(options =>
        {
            var azureStorageConnectionString = configuration["AzureStorageAccountSettings:ConnectionString"];
            options.Containers.Configure<ProfilePictureContainer>(container =>
            {
                container.UseAzure(azure =>
                    {
                        azure.ConnectionString = azureStorageConnectionString;
                        azure.CreateContainerIfNotExists = true;
                    });
            });
        });
    }


    private void ConfigureOptions(ServiceConfigurationContext context, IConfiguration configuration)
    {
        Configure<AzureStorageAccountOptions>(options =>
        {
            var azureStorageConnectionString = configuration["AzureStorageAccountSettings:ConnectionString"];
            var azureStorageAccountUrl = configuration["AzureStorageAccountSettings:AccountUrl"];

            options.ConnectionString = azureStorageConnectionString;
            options.AccountUrl = azureStorageAccountUrl;
        });

        Configure<ImagekitioOptions>(options =>
        {
            options.PublicKey = configuration["ImageKit:PublicKey"];
            options.PrivateKey = configuration["ImageKit:PrivateKey"];
            options.UrlEndpoint = configuration["ImageKit:UrlEndpoint"];
        });
    }
}
