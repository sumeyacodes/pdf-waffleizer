import sys
import os

from markitdown import MarkItDown

# need to manually convert to Marddown?

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

    md = MarkItDown(enable_plugins=False)
    result = md.convert(pdf_path)
    print(result.text_content)

    # print(text)
    print(f"✅ PDF successfully scraped, passing back to server {pdf_path}", file=sys.stderr)

except Exception as e:
    print(f"❌ Error scraping PDF {pdf_path}: {e}", file=sys.stderr)
    sys.exit(2) 