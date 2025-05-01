import { useState, FormEvent } from "react";
import { usPDFScraper } from "../hooks/use-pdf-scraper";
import { UploadFile } from "./input-file";
import { UploadButton } from "./upload-button";

export function UploadPDF() {
  const [file, setFile] = useState<File | null>(null);
  const mutation = usPDFScraper();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      console.warn("No file selected");
      return;
    }

    console.log("🛫 About to upload:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    try {
      await mutation.mutateAsync(file);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-6 shadow-sm space-y-5"
    >
      <UploadFile file={file} onFileChange={setFile} />
      <UploadButton disabled={!file} />
    </form>
  );
}
