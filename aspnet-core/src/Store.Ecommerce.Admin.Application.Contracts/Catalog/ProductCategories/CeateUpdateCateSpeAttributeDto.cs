﻿using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Store.Ecommerce.Catalog.ProductCategories
{
    public class CeateUpdateCateSpeAttributeDto
    {
        public Guid CategoryId { get; set; }
        public int SpecificationAttributeId { get; set; }
    }
}