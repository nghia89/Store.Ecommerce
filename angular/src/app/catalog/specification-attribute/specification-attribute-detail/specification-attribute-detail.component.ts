import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SpecificationAttributeDto, SpecificationAttributeService } from '@proxy/catalog/attributes';
import { NotificationService } from '@share/services/notification.service';
import { UtilityService } from '@share/services/utility.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-specification-attribute-detail',
  templateUrl: './specification-attribute-detail.component.html',
  styleUrls: ['./specification-attribute-detail.component.scss']
})
export class SpecificationAttributeDetailComponent {
  public form: FormGroup
  blockedPanel: boolean = false;
  btnDisabled: boolean = true;
  isHiddenDelete: boolean = false;
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



  private buildForm() {
    this.form = this.fb.group(
      {
        name: new FormControl(this.selectedEntity.name || "", Validators.required),
        sortOrder: new FormControl(this.selectedEntity.sortOrder || 0),
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
