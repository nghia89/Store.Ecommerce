import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SpecificationAttributeOptionDto, SpecificationAttributeOptionService } from '@proxy/catalog/attributes';
import { NotificationService } from '@share/services/notification.service';
import { UtilityService } from '@share/services/utility.service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-specification-attribute-option',
  templateUrl: './specification-attribute-option.component.html'
})
export class SpecificationAttributeOptionComponent implements OnInit {
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
    private dialogService: DialogService,
    private specificationAttributeOptionService: SpecificationAttributeOptionService,
    private notificationService: NotificationService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.buildForm();

    if (this.utilService.isEmpty(this.config.data?.id) == false) {

    }
  }


  saveChange() {

  }


  private buildForm() {
    this.form = this.fb.group(
      {
        name: new FormControl(this.selectedEntity.name || "", Validators.required),
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
