import { useCurrentPDF } from "../hooks/use-current-pdf";

export function AudioPlayer() {
  const { data: currentPDF, isLoading, error } = useCurrentPDF();

  if (currentPDF?.audio) {
    if (isLoading) return <p>Loading…</p>;
    if (error) return <p>Error: {error.message}</p>;
  }

  return (
    currentPDF?.audio?.audioBlob && (
      <audio
        src={currentPDF.audio.audioUrl}
        controls
        autoPlay
        className="w-full rounded-lg mt-4"
      />
    )
  );
}
