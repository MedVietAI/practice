#!/usr/bin/env python3
"""
Image crawler for Vietnam 80th Anniversary event planning
Crawls approved domains for relevant images
"""

import requests
import json
import os
import time
import random
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from config import VALID_DOMAINS, ASSETS_DIR, SOURCES_DIR

class ImageCrawler:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.crawled_images = []
        
    def is_valid_domain(self, url):
        """Check if URL is from approved domains"""
        parsed = urlparse(url)
        return any(domain in parsed.netloc for domain in VALID_DOMAINS)
    
    def extract_images_from_page(self, url):
        """Extract image URLs from a webpage"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            
            images = []
            for img in soup.find_all('img'):
                src = img.get('src') or img.get('data-src')
                if src:
                    # Convert relative URLs to absolute
                    full_url = urljoin(url, src)
                    if self.is_valid_domain(full_url):
                        images.append({
                            'url': full_url,
                            'alt': img.get('alt', ''),
                            'title': img.get('title', ''),
                            'source_page': url
                        })
            
            return images
            
        except Exception as e:
            print(f"Error crawling {url}: {e}")
            return []
    
    def crawl_domain(self, base_url, max_pages=5):
        """Crawl a domain for images"""
        print(f"Crawling {base_url}...")
        
        try:
            response = self.session.get(base_url, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find links to other pages
            links = []
            for link in soup.find_all('a', href=True):
                href = link['href']
                full_url = urljoin(base_url, href)
                if self.is_valid_domain(full_url) and full_url not in links:
                    links.append(full_url)
            
            # Limit to max_pages
            links = links[:max_pages]
            
            all_images = []
            for link in links[:max_pages]:
                images = self.extract_images_from_page(link)
                all_images.extend(images)
                time.sleep(random.uniform(1, 3))  # Be respectful
            
            return all_images
            
        except Exception as e:
            print(f"Error crawling domain {base_url}: {e}")
            return []
    
    def save_results(self):
        """Save crawled images to JSON"""
        os.makedirs(ASSETS_DIR, exist_ok=True)
        
        output_file = os.path.join(ASSETS_DIR, 'images.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.crawled_images, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Saved {len(self.crawled_images)} images to {output_file}")
    
    def run(self):
        """Main crawling process"""
        print("🕷️ Starting image crawler for Vietnam 80th Anniversary...")
        
        # Read source links
        links_file = os.path.join(SOURCES_DIR, 'links.txt')
        if os.path.exists(links_file):
            with open(links_file, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            base_urls = [line.strip() for line in lines if line.strip() and not line.startswith('#')]
        else:
            # Default URLs if no links file
            base_urls = [
                "https://dangcongsan.vn/",
                "https://vtv.vn/",
                "https://nhandan.vn/"
            ]
        
        # Crawl each domain
        for url in base_urls:
            if url:
                images = self.crawl_domain(url)
                self.crawled_images.extend(images)
                print(f"Found {len(images)} images from {url}")
        
        # Remove duplicates
        seen_urls = set()
        unique_images = []
        for img in self.crawled_images:
            if img['url'] not in seen_urls:
                seen_urls.add(img['url'])
                unique_images.append(img)
        
        self.crawled_images = unique_images
        print(f"Total unique images: {len(self.crawled_images)}")
        
        # Save results
        self.save_results()

if __name__ == "__main__":
    crawler = ImageCrawler()
    crawler.run()
