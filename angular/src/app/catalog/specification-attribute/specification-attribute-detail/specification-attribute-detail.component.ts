import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SpecificationAttributeDto, SpecificationAttributeService } from '@proxy/catalog/attributes';
import { NotificationService } from '@share/services/notification.service';
import { UtilityService } from '@share/services/utility.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SpecificationAttributeOptionComponent } from './specification-attribute-option.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-specification-attribute-detail',
  templateUrl: './specification-attribute-detail.component.html'
})
export class SpecificationAttributeDetailComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  public form: FormGroup
  blockedPanel: boolean = false;
  btnDisabled: boolean = true;
  isHiddenDelete: boolean = false;
  isDisableAddOption: boolean = true;
  selectedEntity: SpecificationAttributeDto = {
    id: null, name: "", sortOrder: 0, alias: '', description: '', showOnProductPage: true
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private utilService: UtilityService,
    private dialogService: DialogService,
    private specificationAttributeService: SpecificationAttributeService,
    private notificationService: NotificationService) {
    this.buildForm();
  }
  ngOnInit(): void {
    if (!this.utilService.isEmpty(this.selectedEntity.id))
      this.isDisableAddOption = false
  }

  saveChange() {
    this.toggleBlockUI(true)
    if (this.utilService.isEmpty(this.selectedEntity.id)) {
      this.specificationAttributeService.create(this.form.value).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (rsp) => {
            this.toggleBlockUI(false);
            this.mapEntity(rsp)
          },
          error: (error) => {
            this.notificationService.showError(error.error.error.message);
            this.toggleBlockUI(false);
          }
        })
    } else {
      this.specificationAttributeService.update(this.selectedEntity.id, this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (rsp) => {
            this.toggleBlockUI(false);
            this.mapEntity(rsp)
          },
          error: (error) => {
            this.notificationService.showError(error.error.error.message);
            this.toggleBlockUI(false);
          }
        })
    }
  }
  mapEntity(rsp) {
    this.selectedEntity = {
      id: rsp.id,
      name: rsp.name,
      sortOrder: rsp.sortOrder,
      description: rsp.description,
      showOnProductPage: rsp.showOnProductPage
    }
    this.isDisableAddOption = false
  }


  private buildForm() {
    this.form = this.fb.group(
      {
        // id: new FormControl(this.selectedEntity.id || ""),
        name: new FormControl(this.selectedEntity.name || "", Validators.required),
        sortOrder: new FormControl(this.selectedEntity.sortOrder || 0),
        description: new FormControl(this.selectedEntity.description),
        alias: new FormControl(this.selectedEntity?.alias || ""),
        showOnProductPage: new FormControl(this.selectedEntity?.showOnProductPage || true),
      }
    )
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

  onAddNewOrUpdateOption(id?: number) {
    var ref = this.dialogService.open(SpecificationAttributeOptionComponent, {
      data: {
        id: id,
        specificationAttributeId: this.selectedEntity.id
      },
      header: id ? 'Cập nhật' : 'Thêm mới',
      width: '60%',
      modal: true,
      contentStyle: { overflow: 'auto' },
      maximizable: true,
      resizable: false
    })
    ref.onClose.subscribe((data: SpecificationAttributeOptionComponent) => {
      if (data.isHiddenDelete) {
        // this.toggleBlockUI(true)
        // this.getData();
      }
      else if (data) {
        // this.toggleBlockUI(true)
        //this.getData();
        //this.notificationService.showSuccess(id ? 'Update category success' : 'Add new category success');
      }
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  validationMessages = {
    name: [{ type: 'required', message: 'Bạn phải nhập tên' }]
  };
}
