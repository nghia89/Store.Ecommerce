import { CoreModule } from "@abp/ng.core";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ValidationMessageComponent } from "./validation-message/validation-message.component";
import { UploadPictureComponent } from "./upload-picture/upload-picture.component";
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ImagekitioAngularModule } from "imagekitio-angular";
import { environment } from "src/environments/environment";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { CSCkeditorComponent } from "./ckeditor/cs-ckeditor.Component";

@NgModule({
    imports: [
        CKEditorModule,
        CoreModule,
        CommonModule,
        ButtonModule,
        ProgressBarModule,
        ImagekitioAngularModule.forRoot({
            publicKey: environment.imagekiti.publicKey,
            urlEndpoint: environment.imagekiti.urlEndpoint,
        }),],
    declarations: [ValidationMessageComponent, UploadPictureComponent, CSCkeditorComponent],
    exports: [ValidationMessageComponent, UploadPictureComponent, CSCkeditorComponent]
})
export class AppSharedModule { }