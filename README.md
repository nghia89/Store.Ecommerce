# abp_ecommerce

# migrations on Visual code

- dotnet ef migrations add "inittial" -p Store.Ecommerce.EntityFrameworkCore --startup-project Store.Ecommerce.DbMigrator
- dotnet ef database update -p Store.Ecommerce.EntityFrameworkCore --startup-project Store.Ecommerce.DbMigrator

# install redis on docker

    1. docker pull redis
    2. docker run --name redis -d  --restart unless-stopped redis
    3. docker run -d --restart unless-stopped --name redis-local -p 6379:6379 redis
