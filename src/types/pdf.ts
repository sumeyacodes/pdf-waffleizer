import { Dispatch, SetStateAction } from "react";

export interface UploadFileProps {
  file: File | null;
  onFileChange: Dispatch<SetStateAction<File | null>>;
}
