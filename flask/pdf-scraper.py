import fitz   # this is the pymupdf library

doc = fitz.open("sample.pdf")  # opens the pdf file

# makes a new file to save the text
out = open("output.txt", "wb")

# goes through each page of the pdf
for page in doc: 

    # gets the text from the page and converts it to utf8 format
    text = page.get_text().encode("utf8") 

    # saves the page text to our file
    out.write(text) 

out.close()  # closes the file to save everything