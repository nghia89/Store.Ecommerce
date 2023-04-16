using System;
using System.Collections.Generic;
using System.Text;

namespace Store.Ecommerce.Enum.Products
{
    public enum ProductType
    {
        Single = 1,
        Grouped = 2,
        Configurable = 3,
        Bundle = 4,
        Virtual = 5,
        Downloadable = 6,

    }

    public enum ProductCondition
    {
        New = 0,
        Refurbished = 10,
        Used = 20,
        Damaged = 30
    }
}
