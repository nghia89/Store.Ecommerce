import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUpdateProductCategoryDto, ProductCategoryDto } from '@proxy/catalog/product-categories';
import { MenuItem, TreeNode } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.detail.component.html'
})

export class CategoryDetailComponent implements OnInit {
  public form: FormGroup;
  blockedPanel: boolean = false;
  btnDisabled: boolean = false;
  selectedEntity = { name: "", metaDescription: "", metaTitle: "", sortOrder: 0 } as ProductCategoryDto;


  constructor(private config: DynamicDialogConfig, private fb: FormBuilder) { this.buildForm(); }
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
      metaTitle: new FormControl(this.selectedEntity.metaTitle)
    })
  }
}

