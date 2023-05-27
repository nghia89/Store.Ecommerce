using Store.Ecommerce.Catalog.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp;
using Polly;

namespace Store.Ecommerce.Catalog.Categories
{
    public class CategoryManager : DomainService
    {
        private readonly IRepository<Category, int> _repository;
        public CategoryManager(IRepository<Category, int> repository
            )
        {
            _repository = repository;
        }

        public async void UpdateTreePath(Category category)
        {
            var parentCategory = await _repository.FindAsync(x => x.Id == category.ParentId);

            if (parentCategory != null)
            {
                if (string.IsNullOrEmpty(parentCategory.TreePath))
                {
                    category.TreePath = category.Id.ToString();
                }
                else
                {
                    category.TreePath = $"{parentCategory.TreePath}/{category.Id}";
                }
            }
            else
            {
                category.TreePath = category.Id.ToString();
            }

            await _repository.UpdateAsync(category, true);

            // Cập nhật lại treepath của danh mục con
            var childCategories = await _repository.GetListAsync(c => c.ParentId == category.Id);

            foreach (var childCategory in childCategories)
            {
                UpdateTreePath(childCategory);
            }
        }
    }
}
