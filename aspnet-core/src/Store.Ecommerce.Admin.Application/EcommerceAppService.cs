using System;
using System.Collections.Generic;
using System.Text;
using Store.Ecommerce.Localization;
using Volo.Abp.Application.Services;

namespace Store.Ecommerce.Admin;

/* Inherit your application services from this class.
 */
public abstract class EcommerceAppService : ApplicationService
{
    protected EcommerceAppService()
    {
        LocalizationResource = typeof(EcommerceResource);
    }
}
