import { useState } from "react";
import {
  useAllSavedPDFs,
  useDeleteSavedPDF,
  useViewSavedPDF,
} from "../hooks/use-saved-pdfs";
import { MenuIcon, Trash2 } from "lucide-react";
import { PDF } from "../utils/types";

export function PDFmenu() {
  const { data: pdfs } = useAllSavedPDFs();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-5 right-5  z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-neutral-900 border-neutral-800 rounded border  hover:bg-neutral-800 cursor-pointer">
        <MenuIcon />
      </button>

      <ul
        className={`absolute right-0 mt-2 min-w-[350px] max-h-[60vh] bg-neutral-950 border-neutral-800 border rounded-md
        overflow-y-auto 
        transition-opacity duration-200 no-scrollbar 
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {pdfs.length === 0 ? (
          <span>No PDFs stored yet.</span>
        ) : (
          <li className="space-y-3 ">
            {pdfs.map((pdf) => (
              <StoredPDFitem key={pdf.id} pdf={pdf} />
            ))}
          </li>
        )}
      </ul>
    </nav>
  );
}

const StoredPDFitem = ({ pdf }: { pdf: PDF }) => {
  const { mutate: deletePdf } = useDeleteSavedPDF();
  const { mutate: viewSavedPDF } = useViewSavedPDF();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up to the article
    deletePdf(pdf);
  };

  const handleClick = () => viewSavedPDF(pdf.id);

  return (
    <article
      onClick={handleClick}
      className="flex justify-between items-start border-b border-neutral-800 pb-3 cursor-pointer hover:bg-neutral-800 transition-colors 300s p-3 text-start ">
      <div>
        <h2 className="font-bold">{pdf.name}</h2>
        <p className="text-xs text-neutral-400">{pdf.time}</p>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-400 p-1 cursor-pointer"
        title="Delete PDF">
        <Trash2 size={16} />
      </button>
    </article>
  );
};
