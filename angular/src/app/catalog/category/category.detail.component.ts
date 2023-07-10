import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUpdateProductCategoryDto, ProductCategoryDto, ProductCategoriesService } from '@proxy/catalog/product-categories';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService, TreeNode } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UtilityService } from '@share/services/utility.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '@share/services/notification.service';
import { FileModel } from '@share/models/upload-event.dto';
@Component({
  selector: 'app-category',
  templateUrl: './category.detail.component.html'
})


export class CategoryDetailComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  nodes: any[];
  selectedNodes: any;
  public form: FormGroup;
  blockedPanel: boolean = false;
  btnDisabled: boolean = true;
  isHiddenDelete: boolean = false;
  files: FileModel[] = []
  selectedEntity = { name: "", parentId: null, metaDescription: "", metaTitle: "", sortOrder: 0, code: "", slug: "", coverPicture: "", isActive: false, isFeatured: false } as ProductCategoryDto;

  constructor(
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private utilService: UtilityService,
    private productCategoriesService: ProductCategoriesService,
    private ref: DynamicDialogRef,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) { this.buildForm(); }


  validationMessages = {
    name: [{ type: 'required', message: 'Bạn phải nhập tên' }],
    sortOrder: [{ type: 'required', message: 'Bạn phải nhập thứ tự' }],
  };
  ngOnInit(): void {
    this.buildForm();
    this.getListTree();
    if (this.utilService.isEmpty(this.config.data?.id) == false) {
      this.loadFormDetail(this.config.data?.id);
    }
  }

  showDialog() {

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  onSelectedNodes(value) {
    this.selectedNodes = value.node
  }

  public OnFileSelect = (files: FileModel[]) => {
    if (files)
      this.form.patchValue({
        coverPicture: files[0]?.path || "",
        coverPictureId: files[0]?.id || ""
      })
  }

  loadFormDetail(id) {
    this.isHiddenDelete = true;
    this.toggleBlockUI(true);
    this.productCategoriesService.get(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (rsp) => {
          this.selectedEntity = rsp;
          this.buildForm();
          this.selectedNodes = rsp.parent
          this.toggleBlockUI(false);
          if (rsp.coverPicture)
            this.files = [{ id: rsp.coverPictureId, fileName: rsp.coverPicture, path: rsp.coverPicture, postSuccess: true }]
        },
        error: (error) => {
          this.notificationService.showError(error.error.error.message);
          this.toggleBlockUI(false);
        }
      })
  }

  getListTree() {
    this.productCategoriesService.getListTree()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (rsp) => {
          this.nodes = rsp;
          this.toggleBlockUI(false);
        },
        error: (error) => {
          this.notificationService.showError(error.error.error.message);
          this.toggleBlockUI(false);
        }
      })

  }

  handleDelete() {
    this.toggleBlockUI(true);
    this.productCategoriesService.delete(this.config.data.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: () => {
          this.toggleBlockUI(false);
          this.notificationService.showSuccess("You have delete success");
          this.form = null;
          this.ref.close({ isHiddenDelete: this.isHiddenDelete, id: null })
        },
        error: (error) => {
          this.notificationService.showError(error.error.error.message);
          this.toggleBlockUI(false);
        }
      })
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa danh mục này không?',
      header: 'Xác nhận xoá',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.handleDelete();
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:

            break;
        }
      }
    });
  }


  saveChange() {
    this.toggleBlockUI(true)
    if (this.form.value.parentId != null) {
      this.form.value.parentId = this.form.value.parentId['id'];
    }

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
    } else {
      this.productCategoriesService.update(this.config.data?.id, this.form.value)
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
      }, 300);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      code: new FormControl(this.selectedEntity.code),
      name: new FormControl(this.selectedEntity.name, Validators.required),
      sortOrder: new FormControl(this.selectedEntity.sortOrder),
      isActive: new FormControl(this.selectedEntity.isActive),
      isFeatured: new FormControl(this.selectedEntity.isFeatured),
      metaDescription: new FormControl(this.selectedEntity.metaDescription),
      metaTitle: new FormControl(this.selectedEntity.metaTitle),
      slug: new FormControl(this.selectedEntity.slug),
      coverPicture: new FormControl(this.selectedEntity.coverPicture || ''),
      coverPictureId: new FormControl(this.selectedEntity.coverPictureId || ''),
      parentId: new FormControl(this.selectedEntity.parentId),
    })
  }
}

