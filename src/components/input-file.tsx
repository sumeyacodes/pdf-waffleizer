import { UploadFileProps } from "../types/pdf";

export function UploadFile({ onFileUpload }: UploadFileProps) {
  return (
    <input
      id="upload-file"
      type="file"
      accept=".pdf"
      className="w-full text-sm text-neutral-400  justify-between border border-neutral-800/60 rounded-md px-3 py-4 hover:border-neutral-800/60 transition-colors 500s"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onFileUpload(e.target.files?.[0] as File)
      }
    />
  );
}
