import { useQueryClient, useMutation } from "@tanstack/react-query";
import { generateAudio } from "../api/generate-audio";

export function useGenerateAudio() {
  const qc = useQueryClient();
  
  // directly access text content from query cache
  const textContent = qc.getQueryData<string>(["textContent"]);
  
  const mutation = useMutation<Blob, Error, void>({

    mutationKey: ['generateAudio'],
    mutationFn: async () => {
      if (!textContent) {
        throw new Error("No text content available for audio generation");
      }
      console.log(`Generating audio for ${textContent.length} characters`);
      return generateAudio(textContent);
    },

    // log the start of the mutation
    onSuccess: (audioBlob) => {
      console.log("Audio generation successful, blob size:", audioBlob.size);
      qc.setQueryData(['audioBlob'], audioBlob);
    },
    onError: (error) => {
      console.error("Audio generation failed:", error);
    }
  });
  
  // get cached audio blob if available
  // const cachedAudio = qc.getQueryData<Blob>(['audioBlob']);
  
  return {
    textContent,
    audioBlob: mutation.data,
    isFetching: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    // expose mutation methods for triggering audio generation
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
  };
}
