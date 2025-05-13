import { useState, FormEvent } from "react";
// import { usePDFScraper } from "../hooks/use-pdf-scraper";
import { useScrapePDF } from "../hooks/use-scrape-pdf";
import { UploadFile } from "./input-file";
import { UploadButton } from "./upload-button";

export function UploadPDF() {
  const [filePDF, setFilePDF] = useState<File>(File.prototype);
  const { mutate } = useScrapePDF();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!filePDF) {
      console.warn("No file selected");
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
      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-6 shadow-sm space-y-5">
      <UploadFile filePDF={filePDF} onFileUpload={setFilePDF} />
      <UploadButton disabled={!filePDF} />
    </form>
  );
}
