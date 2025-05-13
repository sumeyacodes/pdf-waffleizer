import { useQuery } from "@tanstack/react-query";
import { CurrentPDF } from "../utils/types";
import { getStoredPDFs } from "../utils/local-storage";

export function useStoredPDFs() {
  return useQuery<CurrentPDF[], Error>({
    queryKey: ["storedPDFs"],
    queryFn: () => Promise.resolve(getStoredPDFs()),
    initialData: [],
  });
}
