import { uuid } from '@abp/ng.core';
import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { SavePictureDto } from '@proxy';
import { FileService } from '@proxy/catalog/image-uploader';
import { FileModel } from '@share/models/upload-event.dto';
import { NotificationService } from '@share/services/notification.service';
import { UtilityService } from '@share/services/utility.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})

export class UploadPictureComponent {
  private ngUnsubscribe = new Subject<void>();

  @Input() label?: string
  @Input() isMultiple?: boolean
  @Input() maxNumberFile?: number = 5
  @Output() onFileSelect = new EventEmitter<FileModel[]>
  @Input() files?: FileModel[]

  isProcessing: boolean;
  listFile: FileModel[] = []
  isDisable: boolean = false
  constructor(private utilService: UtilityService,
    private fileService: FileService,
    private notificationService: NotificationService
  ) { }
  ngOnInit(): void {
    if (this.files)
      this.listFile = [...this.files]
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.files?.currentValue) {
      this.listFile = [...changes.files?.currentValue]
      this.handleCheckDisableBtn()
    }
  }

  public theCallback() {
    this.onFileSelect.emit(this.listFile);
  }

  async onDeleteFile(id) {
    var file = this.listFile.find(x => x.id == id);
    this.listFile = this.listFile.filter(x => x.id != id)
    if (file?.postSuccess)
      await this.fileService.delete(file.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
        next: () => {
          this.theCallback()
        }, error: (error) => {
          this.notificationService.showError("Có lỗi xảy ra.");
          this.isProcessing = false
        }

      })
    this.handleCheckDisableBtn()
  }

  async uploadFileEvt(event) {
    this.isProcessing = true
    if (event && event.target.files) {
      let file = event.target.files[0];
      if (!this.isMultiple) {
        this.listFile.length = 0;
        let newFile = {
          id: uuid().toString(),
          path: URL.createObjectURL(file),
          fileName: file.name,
          postSuccess: false
        }
        this.listFile.push(newFile)
        this.handleCheckDisableBtn()
        let fileBase64 = await this.utilService.fileToBase64(file);
        await this.HandleUploadFileServer(newFile.id, fileBase64, newFile.fileName);
        URL.revokeObjectURL(file)
      }
    }
  }

  async HandleUploadFileServer(id, file, fileName) {
    let body = {
      fileName: fileName,
      content: file
    } as SavePictureDto
    await this.fileService.savePictureByInput(body).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (rsp) => {
          let findFile = this.listFile.find(x => x.id == id);
          if (findFile) {
            findFile.path = rsp.path
            findFile.id = rsp.id
            findFile.postSuccess = true
          }
          this.theCallback()
          this.isProcessing = false
        },
        error: (error) => {
          this.notificationService.showError(error.error.error.message);
          this.isProcessing = false
        }
      })
  }

  handleCheckDisableBtn() {
    if (this.listFile.length >= this.maxNumberFile)
      this.isDisable = true
    else if (this.listFile.length == 1 && !this.isMultiple)
      this.isDisable = true
    else
      this.isDisable = false
  }
}
