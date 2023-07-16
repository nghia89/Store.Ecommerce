import { NgModule } from "@angular/core";
import { CategoryComponent } from "./category/category.component";
import { CatalogRoutingModule } from "./catalog-routing.module";
import { ButtonModule } from "primeng/button";
import { TreeModule } from 'primeng/tree';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from "@angular/common";
import { DialogModule } from 'primeng/dialog';
import { CategoryDetailComponent } from "./category/category.detail.component";
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { InputTextModule } from "primeng/inputtext";
import { BlockUIModule } from "primeng/blockui";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppSharedModule } from "@share/modules/app-share-module";
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TreeSelectModule } from 'primeng/treeselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ImagekitioAngularModule } from "imagekitio-angular";
import { environment } from "src/environments/environment";
import { ProductComponent } from './product/product.component';
import { TableModule } from 'primeng/table';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CardModule } from 'primeng/card';
@NgModule({
    declarations: [
        CategoryDetailComponent,
        CategoryComponent,
        ProductComponent,
        ProductDetailComponent
    ],
    imports: [
        FormsModule,
        AppSharedModule,
        ReactiveFormsModule,
        CommonModule,
        CatalogRoutingModule,
        ButtonModule,
        TreeModule,
        BreadcrumbModule,
        SkeletonModule,
        DialogModule,
        PanelModule,
        ProgressSpinnerModule,
        InputTextModule,
        BlockUIModule,
        InputSwitchModule,
        InputNumberModule,
        InputTextareaModule,
        TreeSelectModule,
        ConfirmDialogModule,
        FileUploadModule,
        TableModule,
        CardModule
    ],
    entryComponents: [CategoryDetailComponent]
})

export class CatalogModule { } 