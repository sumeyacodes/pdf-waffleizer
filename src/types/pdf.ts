import { Dispatch, SetStateAction } from "react";

export interface FileProps {
  filePDF: File;
  markdownPDF?: string;
  onFileUpload: Dispatch<SetStateAction<File>>;
}
