﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Store.Ecommerce.Catalog.Products
{
    public class ProductListFilterDto : BaseListFilterDto
    {
        public int? CategoryId { get; set; }
    }

}
