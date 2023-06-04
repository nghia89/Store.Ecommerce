import { NgModule } from "@angular/core";
import { CategoryComponent } from "./category/category.component";
import { CatalogRoutingModule } from "./catalog-routing.module";
import { ButtonModule } from "primeng/button";
import { TreeModule } from 'primeng/tree';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
    declarations: [
        CategoryComponent
    ],
    imports: [
        CatalogRoutingModule,
        ButtonModule,
        TreeModule,
        BreadcrumbModule
    ],
    entryComponents: []
})

export class CatalogModule { } 