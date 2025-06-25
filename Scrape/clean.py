import json
import re

# Load the JSON file
with open("college_data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Function to clean text safely
def clean_text(text):
    if not isinstance(text, str):  # If text is None or not a string, return empty string
        return ""
    text = re.sub(r'\(https?://\S+\)', '', text)  # Remove URLs in brackets
    text = re.sub(r'https?://\S+', '', text)  # Remove standalone URLs
    text = re.sub(r'\[.*?\]', '', text)  # Remove markdown links
    text = re.sub(r'[^a-zA-Z0-9\s:|,.]', '', text)  # Keep only readable text
    text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces and newlines
    return text

# Process all entries safely
cleaned_data = [{"text": clean_text(item.get("text")), "markdown": clean_text(item.get("markdown"))} for item in data]

# Save cleaned data to a new JSON file
with open("cleaned_data.json", "w", encoding="utf-8") as file:
    json.dump(cleaned_data, file, indent=2)

print("✅ Data cleaned successfully and saved in cleaned_data.json")
