import { UploadFileProps } from "../utils/types";

export function UploadFile({ onFileUpload }: UploadFileProps) {
  return (
    <input
      id="upload-file"
      type="file"
      accept=".pdf"
      className="w-full text-sm text-neutral-400  justify-between border border-neutral-800/60 rounded-md px-3 py-4"
      onChange={(e) => onFileUpload(e.target.files?.[0] as File)}
    />
  );
}
