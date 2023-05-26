# abp_ecommerce

# migrations on Visual code

-   dotnet ef migrations add "inittial" -p Store.Ecommerce.EntityFrameworkCore --startup-project Store.Ecommerce.DbMigrator
-   dotnet ef database update -p Store.Ecommerce.EntityFrameworkCore --startup-project Store.Ecommerce.DbMigrator
