using System.Threading.Tasks;

namespace Store.Ecommerce.Data;

public interface IEcommerceDbSchemaMigrator
{
    Task MigrateAsync();
}
