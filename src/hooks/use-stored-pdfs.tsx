import { useQuery } from "@tanstack/react-query";
import { PDF } from "../utils/types";
import { getStoredPDFs } from "../utils/local-storage";

export function useStoredPDFs() {
  return useQuery<PDF[], Error>({
    queryKey: ["storedPDFs"],
    queryFn: () => Promise.resolve(getStoredPDFs()),
    initialData: [],
  });
}
