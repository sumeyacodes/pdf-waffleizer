import { useState, FormEvent } from "react";
import { usePDFScraper } from "../hooks/use-pdf-scraper";
import { UploadFile } from "./input-file";
import { UploadButton } from "./upload-button";

export function UploadPDF() {
  const [filePDF, setFilePDF] = useState<File>(File.prototype);
  const mutation = usePDFScraper();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!filePDF) {
      console.warn("No file selected");
      return;
    }

    try {
      await mutation.mutateAsync(filePDF);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-6 shadow-sm space-y-5"
    >
      <UploadFile filePDF={filePDF} onFileUpload={setFilePDF} />
      <UploadButton disabled={!filePDF} />
    </form>
  );
}
