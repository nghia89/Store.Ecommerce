import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from "./category/category.component";
import { PermissionGuard } from "@abp/ng.core";
import { ProductComponent } from "./product/product.component";


const routes: Routes = [
    {
        path: 'category',
        component: CategoryComponent,
        canActivate: [PermissionGuard],
    }, {
        path: 'product',
        component: ProductComponent,
        canActivate: [PermissionGuard],

    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CatalogRoutingModule { }