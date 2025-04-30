import MDX from "../../flask/output.mdx";

export function PDF() {
  return (
    <section className="w-full p-5 bg-neutral-400 text-black rounded-lg space-y-5 text-left gap-5">
      <MDX />
    </section>
  );
}
