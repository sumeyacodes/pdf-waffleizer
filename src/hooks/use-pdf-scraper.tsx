import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scrapeFile } from "../api/scrape-pdf";
import { ScrapedPDF } from "../types/pdf";

export function usePDFScraper() {
  const qc = useQueryClient();

  return useMutation<ScrapedPDF, Error, File>({

    // upload file and extract markdown and text
    mutationFn: (filePDF: File) => scrapeFile(filePDF),
    mutationKey: ["scrapePDF"],
    onMutate: (file) => {
      console.log("📤 Starting PDF scrape for file:", file.name);
    },

    // store markdown and text separately
    onSuccess: (data) => {
      qc.setQueryData<string>(["markdownPDF"], data.markdown);
      qc.setQueryData<string>(["textContent"], data.text);
      console.log("📥 Markdown and text received:", data.markdown, "text: ", data.text);
    },

    onError: (error, variables) => {
      console.error(`❌ PDF scrape error for file: ${variables?.name}`, error);
    },
  });
}
