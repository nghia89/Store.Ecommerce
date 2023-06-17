import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoryDetailComponent } from './category.detail.component';
import { ProductCategoriesService } from '@proxy/catalog/product-categories';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '@share/services/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  items: MenuItem[];
  isLoading: boolean = true
  files: TreeNode[] = [];
  selectedFiles: TreeNode[] = [];
  constructor(private dialogService: DialogService,
    private productCategoriesService: ProductCategoriesService,
    private notificationService: NotificationService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Manage Categories'
    }];
    this.getData()
  }

  getData() {
    this.productCategoriesService.getListTree()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (rsp) => {
          this.files = rsp as TreeNode[];
          this.toggleBlockUI(false);
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
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    }
  }

  onAddNewOrUpdate(id?: number) {
    var ref = this.dialogService.open(CategoryDetailComponent, {
      data: {
        id: id
      },
      header: id ? 'Update category' : 'Add new category',
      width: '60%',
      modal: true,
      contentStyle: { overflow: 'auto' },
      maximizable: true,
      resizable: false
    })
    ref.onClose.subscribe((data: CategoryDetailComponent) => {
      if (data.isHiddenDelete) {
        this.toggleBlockUI(true)
        this.getData();
      }
      else if (data) {
        this.toggleBlockUI(true)
        this.getData();
        this.notificationService.showSuccess(id ? 'Update category success' : 'Add new category success');
      }
    });
  }


  onNodeSelect(event: any) {
    this.onAddNewOrUpdate(event.node.id)
  }

}
