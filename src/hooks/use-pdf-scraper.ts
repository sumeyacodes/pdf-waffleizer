import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scrapeFile } from "../api/scrape-pdf";

export function usPDFScraper() {
  const queryClient = useQueryClient();

  // when file is uploaded, tanstack query updates server state
  // && then calls api to scrape the file
  return useMutation({
    mutationFn: (file: File) => scrapeFile(file),
    onSuccess: (data: { filename: string }) => {
      const filename = data.filename;
      // add file to to react query cache (so it can be read in view-pdf.tsx)
      queryClient.setQueryData(["file"], filename);
    },

    // add error and variables parameters
    // log the actual error and the name of the file that failed
    onError: (error, variables) => {
      console.error(`❌ File upload error for file: ${variables?.name}`, error);
    },
  });
}
