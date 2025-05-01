import sys
import os
import fitz  # this is the pymupdf library

# 1) grab the PDF path from args (args are the command line arguments)
if len(sys.argv) < 2:
    print("Usage: python file-script.py <pdf_path>", file=sys.stderr)
    sys.exit(1)

pdf_path = sys.argv[1]
if not os.path.isfile(pdf_path):
    print(f"❌ File not found: {pdf_path}", file=sys.stderr)
    sys.exit(1)

# 2) save pdf name so unique name for every PDF uploaded
base_dir = os.path.dirname(os.path.abspath(__file__))
pdf_base = os.path.splitext(os.path.basename(pdf_path))[0]
output_filename = f"{pdf_base}.mdx"
output_path = os.path.normpath(os.path.join(base_dir, "../assets", output_filename))

# 3) open & scrape
doc = fitz.open(pdf_path)
with open(output_path, "wb") as out:
    for page in doc:
        out.write(page.get_text().encode("utf8"))

print(f"✅ Scraped text written to {output_path}")