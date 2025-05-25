import { Dispatch, SetStateAction } from "react";
export interface UploadFileProps {
  onFileUpload: Dispatch<SetStateAction<File | null>>;
  filePDF: File | null;
}

export interface Audio {
  audioBlob?: Blob;
  audioUrl?: string;
}

export interface PDF extends Audio {
  id: string;
  file: File;
  name: string;
  time: string;
  markdown: string;
  text: string;
  audio?: Audio;
}
