import { useState } from "react";
import { useStoredPDFs } from "../hooks/use-stored-pdfs";
import { MenuIcon, Trash2 } from "lucide-react";
import { PDF } from "../utils/types";
import { useDeletePDF } from "../hooks/use-delete-pdf";

export function PDFmenu() {
  const { data: pdfs } = useStoredPDFs();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-5 right-5  z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-neutral-900 border-neutral-800 rounded border  hover:bg-neutral-800">
        <MenuIcon />
      </button>

      <ul
        className={`absolute right-0 mt-2 p-3 min-w-[350px] max-h-[60vh] bg-neutral-950 border-neutral-800 border rounded-md
        overflow-y-auto 
        transition-opacity duration-200 no-scrollbar
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {pdfs.length === 0 ? (
          <span>No PDFs stored yet.</span>
        ) : (
          <li className="space-y-3">
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
  const { mutate: deletePdf } = useDeletePDF();

  const handleDelete = () => {
    deletePdf(pdf);
  };

  return (
    <div className="flex justify-between items-start border-b border-neutral-800 pb-3">
      <div>
        <h2 className="font-bold">{pdf.name}</h2>
        <p className="text-xs text-neutral-400">{pdf.time}</p>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-400 p-1"
        title="Delete PDF">
        <Trash2 size={16} />
      </button>
    </div>
  );
};
