import { useQuery, useIsMutating } from "@tanstack/react-query";

export function useViewPDF() {
  const {
    data: MarkdownPDF,
    isError,
    error,
  } = useQuery({
    queryKey: ["filePDF"],
    enabled: false,
    // queryFn property is needed for useQuery but we don't need to fetch anything here
    // but since react markdown requires a string to render, can do this here
    queryFn: () => "",
    staleTime: Infinity,
    throwOnError: false,
  });

  const isLoading = useIsMutating({ mutationKey: ["filePDF"] }) > 0;

  return {
    MarkdownPDF,
    isLoading,
    isError,
    error,
  };
}
