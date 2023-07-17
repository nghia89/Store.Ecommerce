import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UploadAdapter } from "@share/services/uploadAdapter";
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

    constructor() { }
    ngOnInit(): void {

    }

    public onChangeContent({ editor }: ChangeEvent) {
        //const data = editor.getData();

        console.log('editor', editor.data.get());
    }
    onReady(editor: ClassicEditor): void {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader);
        };
    }

}
