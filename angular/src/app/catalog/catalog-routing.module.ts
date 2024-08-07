import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from "./category/category.component";
import { PermissionGuard } from "@abp/ng.core";
import { ProductComponent } from "./product/product.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { SpecificationAttributeComponent } from "./specification-attribute/specification-attribute.component";
import { SpecificationAttributeDetailComponent } from "./specification-attribute/specification-attribute-detail/specification-attribute-detail.component";
import { CategorySpecificationComponent } from "./category-specification/category-specification.component";
import { CategorySpecificationDetailComponent } from "./category-specification/category-specification-detail/category-specification-detail.component";


const routes: Routes = [
    {
        path: 'category',
        component: CategoryComponent,
        canActivate: [PermissionGuard],
    },
    {
        path: 'product',
        component: ProductComponent,
        canActivate: [PermissionGuard],
    },
    {
        path: 'product/:id/edit',
        component: ProductDetailComponent,
        canActivate: [PermissionGuard],
    },
    {
        path: 'product/new',
        component: ProductDetailComponent,
        canActivate: [PermissionGuard],
    },
    {
        path: 'specification-attribute',
        component: SpecificationAttributeComponent,
        canActivate: [PermissionGuard],
    },
    {
        path: 'specification-attribute/:id/edit',
        component: SpecificationAttributeDetailComponent,
        canActivate: [PermissionGuard],
    },
    {
        path: 'specification-attribute/new',
        component: SpecificationAttributeDetailComponent,
        canActivate: [PermissionGuard],
    },
    {
        path: 'category-specification',
        component: CategorySpecificationComponent,
        canActivate: [PermissionGuard]
    },
    {
        path: 'category-specification/new',
        component: CategorySpecificationDetailComponent,
        canActivate: [PermissionGuard]
    },
    {
        path: 'category-specification/:id/edit',
        component: CategorySpecificationDetailComponent,
        canActivate: [PermissionGuard],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CatalogRoutingModule { }