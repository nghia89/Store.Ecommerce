import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoriesService } from '@proxy/catalog/product-categories';
import { CreateUpdateProductDto, ProductDto, ProductsService } from '@proxy/catalog/products';
import { ProductCondition, ProductType } from '@proxy/enum/products';
import { FileModel } from '@share/models/upload-event.dto';
import { NotificationService } from '@share/services/notification.service';
import { UtilityService } from '@share/services/utility.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  nodes: any[];
  selectedNodes: any;
  currentSection = 'section1';
  public form: FormGroup
  blockedPanel: boolean = false;
  btnDisabled: boolean = true;
  isHiddenDelete: boolean = false;

  files: FileModel[] = []
  selectedEntity: CreateUpdateProductDto = {
    name: "", sortOrder: 0, published: false, isActive: false, categoryId: null,
    sellPrice: 0, productType: ProductType.Single, productCondition: ProductCondition.New,
    showOnHomePage: false, isFreeShipping: false, isShippingEnabled: false, additionalShippingCharge: 0,
    width: 0, height: 0, length: 0, weight: 0, disableBuyButton: false
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private utilService: UtilityService,
    private dialogService: DialogService,
    private productService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
    private notificationService: NotificationService) {
    this.buildForm();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getListTree();
    const id = this.route.snapshot.paramMap.get('id');
    if (this.utilService.isEmpty(id) == false) {
      this.loadFormDetail(id);
    }
  }

  loadFormDetail(id) {
    this.toggleBlockUI(true);
    this.productService.get(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (rsp) => {
        this.selectedEntity = rsp;
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
      this.blockedPanel = true;
      this.btnDisabled = true;
    } else {
      this.blockedPanel = false;
      this.btnDisabled = false;
    }
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

  saveChange() {

  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  onSelectedNodes(value) {
    this.selectedNodes = value.node
  }

  OnFileSelect(files) {

  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  scrollTo(section) {
    document.querySelector('#' + section)
      .scrollIntoView();
  }


  private buildForm() {
    this.form = this.fb.group(
      {
        name: new FormControl(this.selectedEntity.name || "", Validators.required),
        sku: new FormControl(this.selectedEntity.sku || ""),
        sortOrder: new FormControl(this.selectedEntity.sortOrder || 0),
        published: new FormControl(this.selectedEntity.published || false),
        isActive: new FormControl(this.selectedEntity.isActive || false),
        categoryId: new FormControl(this.selectedEntity.categoryId, Validators.required),
        sellPrice: new FormControl(this.selectedEntity.sellPrice),
        productType: new FormControl(this.selectedEntity.productType),
        productCondition: new FormControl(this.selectedEntity.productCondition),
        showOnHomePage: new FormControl(this.selectedEntity.showOnHomePage),
        isFreeShipping: new FormControl(this.selectedEntity.isFreeShipping),
        additionalShippingCharge: new FormControl(this.selectedEntity.additionalShippingCharge),
        width: new FormControl(this.selectedEntity.width),
        height: new FormControl(this.selectedEntity.height),
        length: new FormControl(this.selectedEntity.length),
        weight: new FormControl(this.selectedEntity.weight),
        disableBuyButton: new FormControl(this.selectedEntity.disableBuyButton || false),
      }
    )
  }

  validationMessages = {
    name: [{ type: 'required', message: 'Bạn phải nhập tên' }],
    sortOrder: [{ type: 'required', message: 'Bạn phải nhập thứ tự' }],
  };
}
