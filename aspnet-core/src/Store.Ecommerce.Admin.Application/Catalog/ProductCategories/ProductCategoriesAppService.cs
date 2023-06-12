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
        int,
        PagedResultRequestDto,
        CreateUpdateProductCategoryDto,
        CreateUpdateProductCategoryDto>, IProductCategoriesAppService
    {
        private readonly IRepository<Category, int> _repository;
        private readonly CategoryManager _categoryManager;
        public ProductCategoriesAppService(IRepository<Category, int> repository, CategoryManager categoryManager) : base(repository)
        {
            _repository = repository;
            _categoryManager = categoryManager;
        }

        public override async Task DeleteAsync(int id)
        {
            var entity = await this.GetEntityByIdAsync(id);
            if (entity != null && entity.IsDeleted == false)
            {
                entity.IsDeleted = true;
                await _repository.UpdateAsync(entity);
            }
        }
        public override async Task<ProductCategoryDto> CreateAsync(CreateUpdateProductCategoryDto input)
        {
            var createEntity = ObjectMapper.Map<CreateUpdateProductCategoryDto, Category>(input);
            var entity = await _repository.InsertAsync(createEntity, true);
            entity.Slug = entity.Name.Slugify();
            if (input.ParentId != null)
            {
                var parentCategory = await base.GetEntityByIdAsync(input.ParentId.Value);
                if (parentCategory != null)
                {
                    if (string.IsNullOrEmpty(parentCategory.TreePath))
                    {
                        entity.TreePath = entity.Id.ToString();
                    }
                    else
                    {
                        entity.TreePath = $"{parentCategory.TreePath}/{entity.Id}";
                    }
                }
                else
                {
                    entity.TreePath = entity.Id.ToString();
                }
            }
            else
            {
                entity.TreePath = entity.Id.ToString();
            }
            await _repository.UpdateAsync(entity, true);
            return ObjectMapper.Map<Category, ProductCategoryDto>(entity);
        }

        public override async Task<ProductCategoryDto> UpdateAsync(int id, CreateUpdateProductCategoryDto input)
        {
            var category = await base.GetEntityByIdAsync(id);
            if (category != null)
                throw new BusinessException("CategoryIsNotExists");
            var parentId = category.ParentId;

            category.Name = input.Name;
            category.Slug = input.Slug;
            category.Code = input.Code;
            category.Slug = category.Name.Slugify();
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

        public async Task<List<ProductCategoryInListDto>> GetListAllAsync(string? Keyword)
        {
            var query = await Repository.GetQueryableAsync();
            query = query.WhereIf(!string.IsNullOrWhiteSpace(Keyword), x => x.IsDeleted == false && x.Name.Contains(Keyword));
            var data = await AsyncExecuter.ToListAsync(query);
            return ObjectMapper.Map<List<Category>, List<ProductCategoryInListDto>>(data);
        }

        public async Task<List<ProductCategoryTreeDto>> GetListTreeAsync(string? Keyword)
        {
            var listTree = new List<ProductCategoryTreeDto>();
            var listAll = await this.GetListAllAsync(Keyword);

            var listParent = listAll.Where(x => x.ParentId == null);
            foreach (var item in listParent)
            {
                listTree.Add(new ProductCategoryTreeDto
                {
                    Id = item.Id,
                    Parent=item.ParentId,
                    Label = item.Name,
                    Children = getChildren(listAll, item.Id)
                });
            }

            return listTree;
        }

        public List<ProductCategoryTreeDto> getChildren(List<ProductCategoryInListDto> listAll, int id)
        {
            var listTree = new List<ProductCategoryTreeDto>();

            var listChildren = listAll.Where(x => x.ParentId != null && x.ParentId == id);
            if (listChildren?.Any() == false) return listTree;
            foreach (var item in listChildren)
            {
                var childNode = new ProductCategoryTreeDto
                {
                    Id = item.Id,
                    Parent=item.ParentId,
                    Label = item.Name,
                    Children = getChildren(listAll, item.Id)
                };
                if (childNode != null && childNode.Children.Any() == false)
                    childNode.collapsedIcon = "";
                listTree.Add(childNode);
            }
            return listTree;
        }
    }
}
