using Store.Ecommerce.Enum.Products;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Store.Ecommerce.Catalog.Products
{
    public class ProductInListDto : EntityDto<Guid>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Slug { get; set; }
        public string SKU { get; set; }
        public int SortOrder { get; set; }
        public bool Published { get; set; }
        public bool IsActive { get; set; }
        public Guid CategoryId { get; set; }
        public string ThumbnailPicture { get; set; }
        public double SellPrice { get; set; }
        public ProductType ProductType { get; set; }
        public bool ShowOnHomePage { get; set; }
        public Guid ManufacturerId { get; set; }
        public bool DisableBuyButton { get; set; }
    }
}
