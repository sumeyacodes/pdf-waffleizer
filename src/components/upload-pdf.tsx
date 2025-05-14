import { useState, FormEvent } from "react";
import { useExtractPDF } from "../hooks/use-extract-pdf";
import { UploadFile } from "./input-file";
import { UploadButton } from "./upload-button";
import { useGenerateAudio } from "../hooks/use-generate-audio";

export function UploadPDF() {
  const [filePDF, setFilePDF] = useState<File | null>(null);
  const { mutate, isPending } = useExtractPDF();
  const { isPending: isLoading } = useGenerateAudio();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!filePDF || isPending) {
      console.warn("No file selected or upload in progress");
      return;
    } else {
      try {
        mutate(filePDF);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-6 shadow-sm space-y-5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
      <UploadFile filePDF={filePDF} onFileUpload={setFilePDF} />
      <UploadButton disabled={!filePDF || isPending || isLoading} />
    </form>
  );
}
