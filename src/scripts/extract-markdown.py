import sys
import os
import pymupdf4llm

# 1) grab the PDF path from args from /uploads (server)
if len(sys.argv) < 2:
    print("Usage: python file-script.py <pdf_path>", file=sys.stderr)
    sys.exit(1)

pdf_path = sys.argv[1]

if not os.path.isfile(pdf_path):
    print(f"❌ Input PDF file not found: {pdf_path}", file=sys.stderr)
    sys.exit(1)

# 3) open & scrape
try:
    # Convert the PDF to Markdown
    doc = pymupdf4llm.to_markdown(pdf_path)
    
    # Print the Markdown content to standard output
    print(doc)
    print(f"✅ PDF successfully scraped, passing back to server {pdf_path}", file=sys.stderr)

except Exception as e:
    print(f"❌ Error scraping PDF {pdf_path}: {e}", file=sys.stderr)
    sys.exit(2) # Use a different exit code for PDF processing errors