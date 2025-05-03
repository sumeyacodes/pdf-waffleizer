import sys
import os
import fitz  # this is the pymupdf library

# 1) grab the PDF path and output path from args
if len(sys.argv) < 3:
    print("Usage: python file-script.py <pdf_path> <output_path>", file=sys.stderr)
    sys.exit(1)

pdf_path = sys.argv[1]
output_path = sys.argv[2] # Get output path from the 2nd argument

if not os.path.isfile(pdf_path):
    print(f"❌ Input PDF file not found: {pdf_path}", file=sys.stderr)
    sys.exit(1)

# Ensure the output directory exists
output_dir = os.path.dirname(output_path)
if not os.path.exists(output_dir):
    try:
        os.makedirs(output_dir)
        print(f"📂 Created output directory: {output_dir}")
    except OSError as e:
        print(f"❌ Error creating output directory {output_dir}: {e}", file=sys.stderr)
        sys.exit(1)

# 3) open & scrape
try:
    doc = fitz.open(pdf_path)
    with open(output_path, "wb") as out:
        for page in doc:
            out.write(page.get_text().encode("utf8"))
    doc.close()
    print(f"✅ Scraped text written to {output_path}")
except Exception as e:
    print(f"❌ Error processing PDF {pdf_path}: {e}", file=sys.stderr)
    sys.exit(2) # Use a different exit code for PDF processing errors