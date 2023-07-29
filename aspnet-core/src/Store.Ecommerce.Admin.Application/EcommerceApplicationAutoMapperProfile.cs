using AutoMapper;
using Store.Ecommerce.Catalog.Atrributes;
using Store.Ecommerce.Catalog.Attributes;
using Store.Ecommerce.Catalog.Categories;
using Store.Ecommerce.Catalog.ProductCategories;
using Store.Ecommerce.Catalog.Products;

namespace Store.Ecommerce.Admin;

public class EcommerceApplicationAutoMapperProfile : Profile
{
    public EcommerceApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        //  Category
        CreateMap<CreateUpdateProductCategoryDto, Category>();
        CreateMap<Category, CreateUpdateProductCategoryDto>().ReverseMap();
        CreateMap<Category, ProductCategoryDto>().ReverseMap();
        CreateMap<Category, ProductCategoryInListDto>().ReverseMap();


        // Product
        CreateMap<CreateUpdateProductDto, Product>().ReverseMap();
        CreateMap<ProductDto, Product>().ReverseMap();
        CreateMap<ProductInListDto, Product>().ReverseMap();

        //Attributes

        CreateMap<Attribute, AttributeDto>().ReverseMap();
        CreateMap<Attribute, CreateUpdateAttributeDto>().ReverseMap();
        CreateMap<CreateUpdateSpecificationAttributeDto, SpecificationAttribute>().ReverseMap();
        CreateMap<CreateUpdateSpecificationAttributeOptionDto, SpecificationAttributeOption>().ReverseMap();
    }
}
