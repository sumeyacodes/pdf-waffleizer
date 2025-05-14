import { useCurrentPDF } from "../hooks/use-current-pdf";

export function AudioPlayer() {
  const { data: currentPDF } = useCurrentPDF();

  if (!currentPDF?.audio?.audioUrl) return null;
  return (
    <audio
      key={currentPDF.audio.audioUrl}
      src={currentPDF.audio.audioUrl}
      controls
      autoPlay
      className="w-full rounded-lg mt-4"
    />
  );
}
