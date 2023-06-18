import { Component, Input } from '@angular/core';
import { FileModel, Hero } from '@share/models/upload-event.dto';
import { UtilityService } from '@share/services/utility.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss']
})

export class UploadPictureComponent {
  @Input() hero?: Hero;
  @Input() label?: string
  @Input() isMultiple?: boolean

  listFile: FileModel[] = []
  constructor(private utilService: UtilityService) { }
  ngOnInit(): void {

  }
  async uploadFileEvt(event) {
    if (event && event.target.files) {
      let file = event.target.files[0];
      if (!this.isMultiple) {
        this.listFile.length = 0;
        this.listFile.push({
          path: URL.createObjectURL(file),
          fileName: file.name,
        })
        // let bytes = await this.utilService.convertFileToByteArray(file);
        // console.log(bytes);
        URL.revokeObjectURL(file)
      }
    }
  }
}
