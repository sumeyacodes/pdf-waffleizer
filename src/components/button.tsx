import { Upload } from "lucide-react";
export function UploadButton() {
  return (
    <button className="bg-black p-3 px-5 rounded-lg flex items-center justify-center gap-2 text-lg">
      Upload File
      <Upload />
    </button>
  );
}
