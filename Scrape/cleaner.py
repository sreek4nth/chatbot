import json

# Load the cleaned JSON file
with open("cleaned_data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Remove entries where both "text" and "markdown" are empty
filtered_data = [entry for entry in data if entry["text"].strip() or entry["markdown"].strip()]

# Save the filtered data back to a new JSON file
with open("final_cleaned_data.json", "w", encoding="utf-8") as file:
    json.dump(filtered_data, file, indent=2)

print("✅ Blank entries removed and saved in final_cleaned_data.json")
