import { Dispatch, SetStateAction } from "react";

export interface FileProps {
  filePDF: File;
  markdownPDF?: string;
  onFileUpload: Dispatch<SetStateAction<File>>;
  message?: string;
}


export interface ScrapedPDF {
  markdown: string;
  text: string;
}