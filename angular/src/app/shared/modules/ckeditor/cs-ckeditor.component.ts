import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FileService } from "@proxy/catalog/image-uploader";
import { UploadAdapter } from "@share/services/uploadAdapter";
import { UtilityService } from "@share/services/utility.service";
import { Subject } from "rxjs";

@Component({
    selector: 'ckeditor-component',
    templateUrl: './cs-ckeditor.component.html'
})

export class CSCkeditorComponent {


    public Editor = ClassicEditor;

    private ngUnsubscribe = new Subject<void>();

    @Output() onChange = new EventEmitter<any>
    @Input() content: string

    constructor(private utilService: UtilityService, private fileService: FileService) { }
    ngOnInit(): void {

    }

    public onChangeContent({ editor }: ChangeEvent) {
        //const data = editor.getData();

        console.log('editor', editor.data.get());
    }
    onReady(editor: ClassicEditor): void {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, this.utilService, this.fileService);
        };
    }

}
