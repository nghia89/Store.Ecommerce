import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from "./category/category.component";
import { PermissionGuard } from "@abp/ng.core";


const routes: Routes = [
    {
        path: 'category',
        component: CategoryComponent,
        canActivate: [PermissionGuard],

    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CatalogRoutingModule { }