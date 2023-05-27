using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace Store.Ecommerce.Catalog.Products
{
    public class ProductsAppService : CrudAppService<
        Product,
        ProductDto,
        Guid,
        PagedResultRequestDto,
        CreateUpdateProductDto,
        CreateUpdateProductDto>, IProductsAppService
    {
        private readonly ProductManager _productManager;

        public ProductsAppService(IRepository<Product, Guid> repository, ProductManager productManager) : base(repository)
        {
            _productManager = productManager;
        }
        public override async Task<ProductDto> CreateAsync(CreateUpdateProductDto input)
        {
            var entity = ObjectMapper.Map<CreateUpdateProductDto, Product>(input);
            var product = await _productManager.CheckCreate(entity);

            //if (input.ThumbnailPictureContent != null && input.ThumbnailPictureContent.Length > 0)
            //{
            //    await SaveThumbnailImageAsync(input.ThumbnailPictureName, input.ThumbnailPictureContent);
            //    product.ThumbnailPicture = input.ThumbnailPictureName;

            //}
            var result = await Repository.InsertAsync(product);

            return ObjectMapper.Map<Product, ProductDto>(result);
        }

        public override async Task<ProductDto> UpdateAsync(Guid id, CreateUpdateProductDto input)
        {
            var product = await Repository.GetAsync(id);
            if (product == null)
                throw new BusinessException("ProductIsNotExists");
            product.Name = input.Name;
            product.Slug = input.Slug;
            product.ProductType = input.ProductType;
            product.SKU = input.SKU;
            product.SortOrder = input.SortOrder;
            product.ShowOnHomePage = input.ShowOnHomePage;
            product.IsActive = input.IsActive;

            if (product.CategoryId != input.CategoryId)
            {
                product.CategoryId = input.CategoryId;
            }
            product.MetaDescription = input.MetaDescription;
            product.Description = input.Description;
            product.ShortDescription = input.ShortDescription;
            product.ThumbnailPicture = input.ThumbnailPicture;
            product.SellPrice = input.SellPrice;
            product.IsFreeShipping = input.IsFreeShipping;
            product.IsShippingEnabled = input.IsShippingEnabled;
            product.Weight = input.Weight;
            product.Width = input.Width;
            product.Height = input.Height;
            product.Length = input.Length;
            product.AdditionalShippingCharge = input.AdditionalShippingCharge;
            product.DisableBuyButton = input.DisableBuyButton;
            product.ProductCondition = input.ProductCondition;
            await Repository.UpdateAsync(product);

            return ObjectMapper.Map<Product, ProductDto>(product);
        }

        public override async Task DeleteAsync(Guid id)
        {
            var product = await Repository.GetAsync(id);
            product.IsDeleted = true;
            await Repository.UpdateAsync(product, true);
        }

        public async Task<List<ProductInListDto>> GetListAllAsync()
        {
            var query = await Repository.GetQueryableAsync();
            query = query.Where(x => x.IsActive == true && x.IsDeleted == false);
            var data = await AsyncExecuter.ToListAsync(query);

            return ObjectMapper.Map<List<Product>, List<ProductInListDto>>(data);
        }

        public async Task<PagedResultDto<ProductInListDto>> GetListFilterAsync(ProductListFilterDto input)
        {
            var query = await Repository.GetQueryableAsync();
            query = query.WhereIf(!string.IsNullOrWhiteSpace(input.Keyword), x => x.Name.Contains(input.Keyword));
            query = query.WhereIf(input.CategoryId.HasValue, x => x.CategoryId == input.CategoryId);

            var totalCount = await AsyncExecuter.LongCountAsync(query);
            var data = await AsyncExecuter.ToListAsync(query.Skip(input.SkipCount).Take(input.MaxResultCount));

            return new PagedResultDto<ProductInListDto>(totalCount, ObjectMapper.Map<List<Product>, List<ProductInListDto>>(data));
        }
    }
}
