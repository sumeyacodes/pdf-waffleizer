import { AudioLines } from "lucide-react";
import { generateAudio } from "../api/generate-audio";
import { useGenerateAudio } from "../hooks/use-generate-audio";
import { useState } from "react";
// import { DefaultMD } from "../hooks/use-view-pdf";

export function GenerateAudio() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const {textContent} = useGenerateAudio()


  const audio = async () => {
  const blob = await generateAudio(textContent as string ?? "ha ha ha, doesn't work. you suck");
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  return (
    <>
      <button
        className="w-full h-full bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-sm flex flex-col items-center justify-center gap-1 transition-colors duration-200"
        onClick={audio}
      >
        <AudioLines className="w-20 h-20 text-blue-400 hover:text-blue-300 transition-colors 200s" />
        <p className="  text-neutral-400 font-extrabold text-lg">
          Convert to Audio
        </p>
      </button>

      {audioUrl && (
        <audio src={audioUrl} controls autoPlay className="w-full rounded-lg" />
      )}
    </>
  );
}
