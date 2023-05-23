using Polly;
using Store.Ecommerce.Catalog.Categories;
using Store.Ecommerce.Catalog.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace Store.Ecommerce.Catalog.ProductCategories
{
    public class ProductCategoriesAppService : CrudAppService<
        Category,
        ProductCategoryDto,
        Guid,
        PagedResultRequestDto,
        CreateUpdateProductCategoryDto,
        CreateUpdateProductCategoryDto>, IProductCategoriesAppService
    {
        private readonly IRepository<Category, Guid> _repository;
        private readonly CategoryManager _categoryManager;
        public ProductCategoriesAppService(IRepository<Category, Guid> repository, CategoryManager categoryManager) : base(repository)
        {
            _repository = repository;
            _categoryManager = categoryManager;
        }

        public override async Task<ProductCategoryDto> CreateAsync(CreateUpdateProductCategoryDto input)
        {
            var createEntity = new Category(Guid.NewGuid(), input.Name, input.Code, input.Slug, input.SortOrder, input.CoverPicture, input.IsFeatured, input.IsActive, input.MetaDescription,
                input.MetaTitle, input.ParentId);
            if (input.ParentId != null)
            {
                var parentCategory = await base.GetEntityByIdAsync(input.ParentId.Value);
                if (parentCategory != null)
                {
                    if (string.IsNullOrEmpty(parentCategory.TreePath))
                    {
                        createEntity.TreePath = createEntity.Id.ToString();
                    }
                    else
                    {
                        createEntity.TreePath = $"{parentCategory.TreePath}/{createEntity.Id}";
                    }
                }
                else
                {
                    createEntity.TreePath = createEntity.Id.ToString();
                }
            }
            else
            {
                createEntity.TreePath = createEntity.Id.ToString();
            }
            var entity = await _repository.InsertAsync(createEntity, true);
            return ObjectMapper.Map<Category, ProductCategoryDto>(entity);
        }

        public override async Task<ProductCategoryDto> UpdateAsync(Guid id, CreateUpdateProductCategoryDto input)
        {
            var category = await base.GetEntityByIdAsync(id);
            if (category != null)
                throw new BusinessException("CategoryIsNotExists");
            var parentId = category.ParentId;

            category.Name = input.Name;
            category.Slug = input.Slug;
            category.Code = input.Code;
            category.CoverPicture = input.CoverPicture;
            category.IsActive = input.IsActive;
            category.IsFeatured = input.IsFeatured;
            category.ParentId = input.ParentId;
            category.MetaTitle = input.MetaTitle;
            category.MetaDescription = input.MetaDescription;

            await _repository.UpdateAsync(category, true);

            if (parentId != input.ParentId)
                _categoryManager.UpdateTreePath(category);

            return ObjectMapper.Map<Category, ProductCategoryDto>(category);
        }

        public async Task<List<ProductCategoryInListDto>> GetListAllAsync(string Keyword)
        {
            var query = await Repository.GetQueryableAsync();
            query = query.WhereIf(!string.IsNullOrWhiteSpace(Keyword), x => x.Name.Contains(Keyword));
            var data = await AsyncExecuter.ToListAsync(query);
            return ObjectMapper.Map<List<Category>, List<ProductCategoryInListDto>>(data);
        }
    }
}
