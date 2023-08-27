import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SpecificationAttributeDto, SpecificationAttributeOptionDto, SpecificationAttributeOptionService, SpecificationAttributeService } from '@proxy/catalog/attributes';
import { NotificationService } from '@share/services/notification.service';
import { UtilityService } from '@share/services/utility.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { PagedResultRequestDto } from '@abp/ng.core';

@Component({
  selector: 'app-category-specification-detail',
  templateUrl: './category-specification-detail.component.html'
})
export class CategorySpecificationDetailComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();

  public form: FormGroup
  blockedPanel: boolean = false;
  isLoadingOption: boolean = true;
  btnDisabled: boolean = true;
  isHiddenDelete: boolean = false;
  isDisableAddOption: boolean = true;
  selectedEntity: SpecificationAttributeDto = {
    id: null, name: "", sortOrder: 0, alias: '', description: '', showOnProductPage: true
  }
  param: PagedResultRequestDto = { skipCount: 0, maxResultCount: 50 };
  dataAttributeOption: SpecificationAttributeOptionDto[];
  totalCount: number
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private utilService: UtilityService,
    private dialogService: DialogService,
    private specificationAttributeService: SpecificationAttributeService,
    private specificationAttributeOptionService: SpecificationAttributeOptionService,
    private notificationService: NotificationService) {
  }
  ngOnInit(): void {

  }


}
