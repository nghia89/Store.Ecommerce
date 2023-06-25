export interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

export interface FileModel {
    path: any;
    size?: number;
    fileName?: string;
    extension?: string;
    type?: string;
    id?: string;
    postSuccess?: boolean;
}