import { Upload } from "lucide-react";

export function UploadButton({ disabled = false }: { disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className="w-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-neutral-400 rounded-md px-4 py-3 text-sm font-extrabold transition-colors flex items-center justify-center gap-2 disabled:opa 200s">
      Upload PDF
      <Upload className="h-4" />
    </button>
  );
}
