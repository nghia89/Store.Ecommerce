export interface UploadEvent {
    originalEvent: Event;
    files: File[];
}
export interface Hero {
    name: string
    id: string
}

export interface FileModel {
    path: any;
    size?: number;
    fileName?: string;
    extension?: string;
    type?: string;
    guiId?: number;
    postSuccess?: boolean;
}