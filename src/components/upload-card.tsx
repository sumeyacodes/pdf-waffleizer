import { InputFile } from "./input-file";
import { UploadButton } from "./upload-button";

export function UploadCard() {
  return (
    <section className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-6 shadow-sm space-y-5">
      <InputFile />

      <UploadButton />
    </section>
  );
}
