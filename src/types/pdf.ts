import { Dispatch, SetStateAction } from "react";
export interface UploadFileProps {
  onFileUpload: Dispatch<SetStateAction<File>>;
  filePDF: File;
}

export interface CurrentPDF {
  file: File;
  name: string;
  time: string;
  markdown: string;
  text: string;
  audio?: Blob;
  audioUrl?: string;
}
