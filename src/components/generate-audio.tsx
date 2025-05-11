import { AudioLines } from "lucide-react";
import { generateAudio } from "../api/generate-audio";
import { useState } from "react";

export function GenerateAudio() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const audio = async () => {
    const blob = await generateAudio("hello world");
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
          Convert to Audio (disabled)
        </p>
      </button>
      {audioUrl && (
        <audio src={audioUrl} controls autoPlay className="mt-4 w-full" />
      )}
    </>
  );
}
