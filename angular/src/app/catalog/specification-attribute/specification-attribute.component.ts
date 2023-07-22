import { PagedResultRequestDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@share/services/notification.service';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-specification-attribute',
  templateUrl: './specification-attribute.component.html',
  styleUrls: ['./specification-attribute.component.scss']
})
export class SpecificationAttributeComponent implements OnInit {

  data: [];
  items: MenuItem[];
  totalCount: number = 0
  isLoading: boolean = true
  param: PagedResultRequestDto = { skipCount: 1, maxResultCount: 50 };

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private notificationService: NotificationService) { }



  ngOnInit(): void {
    this.items = [{
      label: 'Manage Products'
    }];
    this.getData()
  }

  getData() {
    // this.productService.getList(this.param).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
    //   next: (rsp) => {
    //     this.products = rsp.items
    //     this.totalCount = rsp.totalCount
    //     this.toggleBlockUI(false)
    //   },
    //   error: (error) => {
    //     this.notificationService.showError(error.error.error.message);
    //     this.toggleBlockUI(false);
    //   }
    // })
  }
  onAddNewOrUpdate(id?: number) {
    if (id)
      this.router.navigate(['/catalog/specification-attribute', { id: id }]);
    else
      this.router.navigate(['/catalog/specification-attribute/new']);
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }

}
