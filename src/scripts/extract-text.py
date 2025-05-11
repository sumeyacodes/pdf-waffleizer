import sys
import os
import fitz

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
    # Convert the PDF to text for audio
    textContent = ""
    doc = fitz.open(pdf_path)
    for page in doc:
        textContent += page.get_text()
    doc.close()

    # Print the extracted text content to standard output
    print(textContent)
    
    # Optional: Log success to stderr so it doesn't mix with stdout markdown
    print(f"✅ PDF successfully scraped, passing back to server {pdf_path}", file=sys.stderr)

except Exception as e:
    print(f"❌ Error scraping PDF {pdf_path}: {e}", file=sys.stderr)
    sys.exit(2) # Use a different exit code for PDF processing errors