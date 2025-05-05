import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scrapeFile } from "../api/scrape-pdf";

export function usePDFScraper() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (filePDF: File) => scrapeFile(filePDF),
    mutationKey: ["filePDF"],
    onSuccess: (data: { file: string }) => {
      const MarkdownPDF = data.file;

      console.log("📬 File upload success:", data);

      queryClient.setQueryData(["filePDF"], MarkdownPDF);
    },

    onError: (error, variables) => {
      console.error(`❌ File upload error for file: ${variables?.name}`, error);
    },
  });
}
