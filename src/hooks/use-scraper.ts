import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scrapeFile } from "../api/scrape-pdf";

export const useFileScraper = () => {
  const scrapePDF = useQueryClient();

  // when file is uploaded, tanstack query updates server state
  // && then calls api to scrape the file
  return useMutation({
    mutationFn: (file: File) => scrapeFile(file),
    onSuccess: () => scrapePDF.invalidateQueries({ queryKey: ["file"] }),

    // add error and variables parameters
    // log the actual error and the name of the file that failed
    onError: (error, variables) => {
      console.error(`❌ File upload error for file: ${variables?.name}`, error);
    },
  });
};
