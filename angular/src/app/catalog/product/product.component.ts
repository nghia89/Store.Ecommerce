import { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductCategoriesService } from '@proxy/catalog/product-categories';
import { ProductDto, ProductsService } from '@proxy/catalog/products';
import { NotificationService } from '@share/services/notification.service';
import { MenuItem, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  products: ProductDto[] = [];
  totalCount: number = 0
  items: MenuItem[];
  isLoading: boolean = true
  files: TreeNode[] = [];
  selectedFiles: TreeNode[] = [];
  param: PagedResultRequestDto = { skipCount: 1, maxResultCount: 50 };

  constructor(
    private dialogService: DialogService,
    private productService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
    private notificationService: NotificationService) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.items = [{
      label: 'Manage Products'
    }];
    this.getData()
  }

  getData() {
    this.productService.getList(this.param).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (rsp) => {
        this.products = rsp.items
        this.totalCount = rsp.totalCount
        this.toggleBlockUI(false)
      },
      error: (error) => {
        this.notificationService.showError(error.error.error.message);
        this.toggleBlockUI(false);
      }
    })
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }

  onAddNewOrUpdate(id?: Number) {

  }
}
