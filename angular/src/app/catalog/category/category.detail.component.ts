import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUpdateProductCategoryDto, ProductCategoryDto, ProductCategoriesService } from '@proxy/catalog/product-categories';
import { MenuItem, TreeNode } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilityService } from '@share/services/utility.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '@share/services/notification.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.detail.component.html'
})

export class CategoryDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  public form: FormGroup;
  blockedPanel: boolean = false;
  btnDisabled: boolean = false;
  selectedEntity = { name: "", sku: "", metaDescription: "", metaTitle: "", sortOrder: 0, code: "", slug: "", coverPicture: "", isActive: false, isFeatured: false } as ProductCategoryDto;


  constructor(
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private utilService: UtilityService,
    private productCategoriesService: ProductCategoriesService,
    private ref: DynamicDialogRef,
    private notificationService: NotificationService,
  ) { this.buildForm(); }


  ngOnDestroy(): void { }

  validationMessages = {
    name: [{ type: 'required', message: 'Bạn phải nhập tên' }],
    sortOrder: [{ type: 'required', message: 'Bạn phải nhập thứ tự' }],
  };
  ngOnInit(): void {
    this.buildForm();
  }

  showDialog() {

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  saveChange() {
    this.toggleBlockUI(true)
    if (this.utilService.isEmpty(this.config.data?.id) == true) {
      this.productCategoriesService.create(this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: () => {
            this.toggleBlockUI(false);
            this.ref.close(this.form.value)
          },
          error: (error) => {
            this.notificationService.showError(error.error.error.message);
            this.toggleBlockUI(false);
          }
        })
    }
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.blockedPanel = true;
      this.btnDisabled = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
        this.btnDisabled = false;
      }, 1000);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      code: new FormControl(this.selectedEntity.code),
      name: new FormControl(this.selectedEntity.name, Validators.required),
      sku: new FormControl(this.selectedEntity.sku),
      sortOrder: new FormControl(this.selectedEntity.sortOrder),
      isActive: new FormControl(this.selectedEntity.isActive),
      isFeatured: new FormControl(this.selectedEntity.isFeatured),
      metaDescription: new FormControl(this.selectedEntity.metaDescription),
      metaTitle: new FormControl(this.selectedEntity.metaTitle),
      slug: new FormControl(this.selectedEntity.slug),
      coverPicture: new FormControl(this.selectedEntity.coverPicture),
    })
  }
}

