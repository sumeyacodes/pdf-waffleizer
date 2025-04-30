export function InputFile() {
  return (
    <section className="flex items-center w-full justify-between border border-neutral-800/60 rounded-md px-3 py-4 hover:border-neutral-800/60 transition-colors 500s">
      <input
        id="upload-file"
        type="file"
        accept=".pdf"
        className="w-full text-sm text-neutral-500 font-medium

                     "
      />
    </section>
  );
}
