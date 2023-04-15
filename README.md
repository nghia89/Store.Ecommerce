# abp_ecommerce

# migrations

-   dotnet ef migrations add "inittial" -p ABPEcommerce.EntityFrameworkCore --startup-project ABPEcommerce.DbMigrator
-   dotnet ef database update -p ABPEcommerce.EntityFrameworkCore --startup-project ABPEcommerce.DbMigrator
