from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time

# Initialize WebDriver
service = Service("chromedriver.exe")  # Update path if needed
driver = webdriver.Chrome(service=service)

BASE_URL = "https://sjcetpalai.ac.in/"
visited_urls = set()

def scrape_page(url):
    """Scrape content from a page with Selenium for dynamic content."""
    try:
        driver.get(url)
        time.sleep(3)  # Allow JS content to load

        soup = BeautifulSoup(driver.page_source, 'html.parser')

        # Extract content
        page_text = []
        for tag in soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span']):
            content = tag.get_text(strip=True)
            if content:
                page_text.append(content)

        # Extract and follow links
        links = []
        for a_tag in soup.find_all('a', href=True):
            link = a_tag['href']
            if BASE_URL in link and link not in visited_urls:
                links.append(link)
                visited_urls.add(link)

        # Save content
        save_content(url, page_text)

        return links
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return []

def save_content(url, content):
    """Save scraped content to a file."""
    filename = "sjcet_scraped_content.txt"
    with open(filename, "a", encoding="utf-8") as file:
        file.write(f"\n\nURL: {url}\n")
        file.write("\n".join(content))
        file.write("\n" + "="*80 + "\n")

def crawl_website(url):
    """Crawl the website recursively to scrape content from all linked pages."""
    urls_to_visit = [url]

    while urls_to_visit:
        current_url = urls_to_visit.pop(0)
        if current_url in visited_urls:
            continue
        
        print(f"Scraping: {current_url}")
        visited_urls.add(current_url)

        links = scrape_page(current_url)
        if links:
            urls_to_visit.extend(links)

        # Add a short delay to avoid overwhelming the server
        time.sleep(2)

# Start scraping
if __name__ == "__main__":
    crawl_website(BASE_URL)
    driver.quit()
    print(f"\n✅ Scraping complete! Data saved in 'sjcet_scraped_content.txt'.")
