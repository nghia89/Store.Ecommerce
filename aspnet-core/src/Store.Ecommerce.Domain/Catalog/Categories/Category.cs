using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Store.Ecommerce.Catalog.Categories
{
    public class Category : FullAuditedAggregateRoot<Guid>
    {
        public Category() { }
        public Category(Guid id, string name, string code, string slug, int sortOrder, string coverPicture, bool isFeatured, bool isActive, 
                        string metaDescription, string metaTitle, Guid? parentId)
        {
            Id = id;
            Name = name;
            Code = code;
            Slug = slug;
            SortOrder = sortOrder;
            CoverPicture = coverPicture;
            IsFeatured = isFeatured;
            IsActive = isActive;
            MetaDescription = metaDescription;
            MetaTitle = metaTitle;
            ParentId = parentId;
        }

        public string Name { get; set; }
        public string Code { get; set; }
        public string Slug { get; set; }
        public int SortOrder { get; set; }
        public string CoverPicture { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsActive { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }
        public Guid? ParentId { get; set; }
        public string TreePath { get; set; } = string.Empty;
    }
}
