import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SpecificationAttributeOptionDto, SpecificationAttributeOptionService } from '@proxy/catalog/attributes';
import { NotificationService } from '@share/services/notification.service';
import { UtilityService } from '@share/services/utility.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-specification-attribute-option',
  templateUrl: './specification-attribute-option.component.html'
})
export class SpecificationAttributeOptionComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  public form: FormGroup
  blockedPanel: boolean = false;
  btnDisabled: boolean = true;
  isHiddenDelete: boolean = false;
  selectedEntity: SpecificationAttributeOptionDto = {
    id: null, name: "", sortOrder: 0, alias: '', specificationAttributeId: null
  }

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private utilService: UtilityService,
    private ref: DynamicDialogRef,
    private specificationAttributeOptionService: SpecificationAttributeOptionService,
    private notificationService: NotificationService) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.utilService.isEmpty(this.config.data?.id) == false) {
      this.selectedEntity = this.config.data?.item;
      this.buildForm();
    } else {
      this.buildForm();
    }
  }


  saveChange(id?: string) {
    this.toggleBlockUI(true)
    let body = { ...this.form.value };
    if (this.utilService.isEmpty(this.config.data?.id)) {
      body.specificationAttributeId = this.config.data.specificationAttributeId;
      this.specificationAttributeOptionService.create(body)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (rsp) => {
            this.toggleBlockUI(false);
            this.ref.close(rsp)
          },
          error: (error) => {
            this.notificationService.showError(error.error.error.message);
            this.toggleBlockUI(false);
          }
        })
    } else {
      body.specificationAttributeId = this.config.data.specificationAttributeId;
      this.specificationAttributeOptionService.update(this.config.data?.id, body)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (rsp) => {
            this.toggleBlockUI(false);
            this.ref.close(rsp)
          },
          error: (error) => {
            this.notificationService.showError(error.error.error.message);
            this.toggleBlockUI(false);
          }
        }
        )
    }
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

  private buildForm() {
    this.form = this.fb.group(
      {
        name: new FormControl(this.selectedEntity.name || "", Validators.required),
        alias: new FormControl(this.selectedEntity.alias || ""),
        color: new FormControl(this.selectedEntity.color || ""),
        sortOrder: new FormControl(this.selectedEntity.sortOrder || 0)
      }
    )
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  validationMessages = {
    name: [{ type: 'required', message: 'Bạn phải nhập tên' }]
  };
}
