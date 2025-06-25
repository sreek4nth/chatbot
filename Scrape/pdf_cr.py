import json
from fpdf import FPDF

# Load the JSON file
with open("final_cleaned_data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Combine all "text" fields into one large text block
combined_text = "\n\n".join(entry["text"] for entry in data if entry["text"].strip())

# Initialize PDF
pdf = FPDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()
pdf.set_font("Arial", size=12)

# Split text into chunks to fit PDF page width
for line in combined_text.split("\n"):
    pdf.multi_cell(190, 10, line)

# Save PDF
pdf.output("college_data.pdf")

print("✅ PDF file created successfully: college_data.pdf")
