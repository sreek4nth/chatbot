import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import time
import datetime
import sys

BASE_URL = "https://sjcetpalai.ac.in/"
visited_urls = set()

def scrape_page(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"[{datetime.datetime.now()}] Failed to fetch {url}: {e}")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')
    page_text = [tag.get_text(strip=True) for tag in soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']) if tag.get_text(strip=True)]
    
    links = []
    for a_tag in soup.find_all('a', href=True):
        link = urljoin(url, a_tag['href'])
        if BASE_URL in link and link not in visited_urls:
            links.append(link)
            visited_urls.add(link)

    save_content(url, page_text)
    return links

def save_content(url, content):
    filename = "sjcet_scraped_content.txt"
    with open(filename, "a", encoding="utf-8") as file:
        file.write(f"\n\nURL: {url}\n")
        file.write("\n".join(content))
        file.write("\n" + "="*80 + "\n")

def crawl_website(url):
    urls_to_visit = [url]
    while urls_to_visit:
        current_url = urls_to_visit.pop(0)
        if current_url in visited_urls:
            continue

        print(f"[{datetime.datetime.now()}] Scraping: {current_url}")
        visited_urls.add(current_url)
        links = scrape_page(current_url)
        if links:
            urls_to_visit.extend(links)
        time.sleep(1)

def main(retry=False):
    try:
        crawl_website(BASE_URL)
        print("\n✅ Scraping complete!")
    except Exception as e:
        if not retry:
            print(f"[{datetime.datetime.now()}] ❌ Scraping failed. Retrying after 1 hour.")
            time.sleep(3600)  # wait for 1 hour
            main(retry=True)
        else:
            print(f"[{datetime.datetime.now()}] ❌ Retry failed. Skipping today's scrape.")
            sys.exit(1)

if __name__ == "__main__":
    main()
