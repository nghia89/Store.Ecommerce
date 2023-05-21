using Store.Ecommerce.Enum.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp;
using Volo.Abp.Domain.Services;

namespace Store.Ecommerce.Catalog.Products
{
    public class ProductManager : DomainService
    {
        private readonly IRepository<Product, Guid> _productRepository;
        //private readonly IRepository<ProductCategory, Guid> _productCategoryRepository;
        public ProductManager(IRepository<Product, Guid> productRepository
            //IRepository<ProductCategory, Guid> productCategoryRepository
            )
        {
            //_productCategoryRepository = productCategoryRepository;
            _productRepository = productRepository;
        }

        public async Task<Product> CheckCreate(Product model)
        {
            if (await _productRepository.AnyAsync(x => x.Name == model.Name))
                throw new UserFriendlyException("Tên sản phẩm đã tồn tại", "ProductNameAlreadyExists");
            //if (await _productRepository.AnyAsync(x => x.Code == model.Code))
            //    throw new UserFriendlyException("Mã sản phẩm đã tồn tại", "ProductCodeAlreadyExists");
            if (await _productRepository.AnyAsync(x => x.SKU == model.SKU))
                throw new UserFriendlyException("Mã SKU sản phẩm đã tồn tại", "ProductSKUAlreadyExists");

            //var category = await _productCategoryRepository.GetAsync(categoryId);
 
            return model;
        }
    }
}
