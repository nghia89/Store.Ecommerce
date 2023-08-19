import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductAttributeValueService, SpecificationAttributeDto, SpecificationAttributeOptionDto, SpecificationAttributeOptionService, SpecificationAttributeService } from '@proxy/catalog/attributes';
import { ProductCategoriesService } from '@proxy/catalog/product-categories';
import { CreateUpdateProductDto, ProductDto, ProductSpecificationAttributeService, ProductsService } from '@proxy/catalog/products';
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
    width: 0, height: 0, length: 0, weight: 0, disableBuyButton: false, description: ""
  }
  productId: string = ''

  // Thông tin chi tiết
  dataSpecificationAttribute: SpecificationAttributeDto[];
  selectedSpecificationAttribute: SpecificationAttributeDto | undefined;
  dataSpecificationAttributeOption: SpecificationAttributeOptionDto[]
  selectedSPAttributeOption: SpecificationAttributeOptionDto | undefined;



  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private utilService: UtilityService,
    private dialogService: DialogService,
    private productService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
    private specificationAttributeService: SpecificationAttributeService,
    private specificationAttributeOptionService: SpecificationAttributeOptionService,
    private productSpecificationService: ProductSpecificationAttributeService,
    private notificationService: NotificationService) {
    this.buildForm();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getListTree();
    this.getAllSpecification();
    const id = this.route.snapshot.paramMap.get('id');
    if (this.utilService.isEmpty(id) == false) {
      this.loadFormDetail(id);
    }
  }

  onChangeContent(e) {
    this.setValueForm(e, 'description')
  }

  setValueForm(value: any, fileName: string) {
    if (fileName) {
      this.form.patchValue({
        fileName: value
      })
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

  private getAllSpecification() {
    this.specificationAttributeService.getListAll().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (rsp) => {
          this.dataSpecificationAttribute = rsp
        }
      })
  }

  private getAllSpecificationOption(specificationId: number) {
    this.specificationAttributeOptionService.getListFilter(specificationId, "").pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (rsp) => {
          this.dataSpecificationAttributeOption = rsp
        }
      })
  }

  // private addSpecificationToProduct() {
  //   if (this.selectedSPAttributeOption && this.selectedSpecificationAttribute) {
  //     this.productSpecificationService.create()
  //   }
  // }

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

  onchangeSpecification(e) {
    this.selectedSpecificationAttribute = e.value
    this.selectedSPAttributeOption = null
    this.dataSpecificationAttributeOption = []
    if (e && e.value)
      this.getAllSpecificationOption(e.value.id)
  }

  saveChange() {
    console.log('this.form.value', this.form.value)
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  onSelectedNodes(value) {
    this.selectedNodes = value.node
  }

  OnFileSelect(files) {
    console.log('files', files)
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
        description: new FormControl(this.selectedEntity.description)
      }
    )
  }

  validationMessages = {
    name: [{ type: 'required', message: 'Bạn phải nhập tên' }],
    sortOrder: [{ type: 'required', message: 'Bạn phải nhập thứ tự' }],
    parentId: [{ type: 'required', message: 'Bạn phải nhập thứ tự' }],
  };
}
