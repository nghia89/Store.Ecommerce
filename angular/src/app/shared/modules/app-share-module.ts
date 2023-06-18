import { CoreModule } from "@abp/ng.core";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ValidationMessageComponent } from "./validation-message/validation-message.component";
import { UploadPictureComponent } from "./upload-picture/upload-picture.component";
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
    imports: [CoreModule, CommonModule, ButtonModule, ProgressBarModule],
    declarations: [ValidationMessageComponent, UploadPictureComponent],
    exports: [ValidationMessageComponent, UploadPictureComponent]
})
export class AppSharedModule { }