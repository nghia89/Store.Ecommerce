import { Injectable } from '@angular/core';
import { FileService } from '@proxy/catalog/image-uploader';
import { UtilityService } from '@share/services/utility.service';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class UploadAdapter {
    private ngUnsubscribe = new Subject<void>();
    constructor(loader, private utilService: UtilityService, private fileService: FileService) {
        this.loader = loader;
    }
    loader: any;
    xhr: any;

    upload() {
        return this.loader.file
            .then(file => new Promise(async (resolve, reject) => {
                // this._initRequest();
                // this._initListeners(resolve, reject, file);
                let fileBase64 = await this.utilService.fileToBase64(file);
                await this.fileService.savePictureByInput({ content: fileBase64 }).pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe({
                        next: (rsp) => {
                            resolve({
                                default: rsp.path
                            });
                        },
                        error: (error) => {
                            const genericErrorText = `Couldn't upload file: ${file.name}.`;
                            console.log(genericErrorText)
                        }
                    })
            }));
    }
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://yourserver/upload', true); // TODO change the URL
        xhr.responseType = 'json';
        xhr.setRequestHeader("Accept", "application/json");
    }
    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;
        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }
            resolve({
                default: response.url
            });
        });
        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }
    async _sendRequest(file) {
        const data = new FormData();
        let fileBase64 = await this.utilService.fileToBase64(file);
        data.append('content', fileBase64);
        this.xhr.send(data);
    }
}