import { PagedResultRequestDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CateSpAttributeService, CategorySpecificationAttributeDto } from '@proxy/catalog/product-categories';
import { NotificationService } from '@share/services/notification.service';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-specification',
  templateUrl: './category-specification.component.html'
})
export class CategorySpecificationComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  data: CategorySpecificationAttributeDto[];
  items: MenuItem[];
  totalCount: number = 0
  isLoading: boolean = true
  param: PagedResultRequestDto = { skipCount: 0, maxResultCount: 50 };

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private CateSpAttributeService: CateSpAttributeService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.items = [{
      label: 'Đặc tính sản phẩm theo danh mục'
    }];
    this.getData()
  }

  getData() {
    this.CateSpAttributeService.getList(this.param).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (rsp) => {
        this.data = rsp.items
        this.totalCount = rsp.totalCount
        this.toggleBlockUI(false)
      },
      error: (error) => {
        this.notificationService.showError(error.error.error.message);
        this.toggleBlockUI(false);
      }
    })
  }

  getSeverity(status: boolean) {
    if (status == true)
      return 'success'
    else
      return 'danger'
  }
  getValueStatus(status: boolean) {
    if (status == true)
      return 'Hiển thị'
    else
      return 'Ẩn'

  }
  onAddNewOrUpdate(id?: number) {
    if (id)
      this.router.navigate([`/catalog/category-specification/${id}/edit`]);
    else
      this.router.navigate(['/catalog/category-specification/new']);
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }

}
