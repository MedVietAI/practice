# crawler.py
import os, json, re, time, urllib.parse, requests
from bs4 import BeautifulSoup

BASE_DIR = "public/assets"
os.makedirs(BASE_DIR, exist_ok=True)

# Danh sách domain được phép
SITES = ["dangcongsan.vn", "baochinhphu.vn", "vtv.vn"]

def in_whitelist(url):
    """Kiểm tra URL có thuộc 3 nguồn được phép không"""
    host = urllib.parse.urlparse(url).netloc
    return any(host.endswith(s) for s in SITES)

def fetch_images_from_page(page_url):
    """Trích xuất tất cả ảnh từ một trang web"""
    try:
        r = requests.get(page_url, timeout=30)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")
        imgs = set()
        
        # Lấy og:image (ảnh đại diện)
        for tag in soup.select('meta[property="og:image"]'):
            if tag.get("content"):
                imgs.add(urllib.parse.urljoin(page_url, tag["content"]))
        
        # Lấy tất cả thẻ img
        for img_tag in soup.find_all("img"):
            src = img_tag.get("data-src") or img_tag.get("src")
            if src:
                imgs.add(urllib.parse.urljoin(page_url, src))
        
        return list(imgs)
    except Exception as e:
        print(f"Lỗi khi tải trang {page_url}: {e}")
        return []

def sanitize_filename(name):
    """Làm sạch tên file"""
    name = name.strip().split("?")[0]
    name = os.path.basename(name)
    return re.sub(r'[^a-zA-Z0-9._-]+','_', name) or f"img_{int(time.time()*1000)}.jpg"

def download_image(url, save_dir=BASE_DIR):
    """Tải ảnh về máy"""
    try:
        filename = sanitize_filename(url)
        if not filename.lower().endswith((".jpg",".jpeg",".png",".webp")):
            filename += ".jpg"
        
        filepath = os.path.join(save_dir, filename)
        
        with requests.get(url, stream=True, timeout=60) as r:
            r.raise_for_status()
            with open(filepath, "wb") as f:
                for chunk in r.iter_content(8192):
                    if chunk:
                        f.write(chunk)
        
        return filepath
    except Exception as e:
        print(f"Lỗi khi tải ảnh {url}: {e}")
        return None

def run():
    """Hàm chính thực hiện crawler"""
    links_path = "sources/links.txt"
    if not os.path.exists(links_path):
        print("❌ Thiếu file sources/links.txt")
        return
    
    with open(links_path, "r", encoding="utf-8") as f:
        pages = [line.strip() for line in f if line.strip()]

    downloaded_images = []
    
    for page_url in pages:
        if not in_whitelist(page_url):
            print(f"⚠️ Bỏ qua URL không hợp lệ: {page_url}")
            continue
        
        print(f"🔍 Đang xử lý: {page_url}")
        images = fetch_images_from_page(page_url)
        
        for img_url in images:
            try:
                filepath = download_image(img_url)
                if filepath:
                    downloaded_images.append({
                        "local_path": filepath.replace("\\","/"),
                        "source_page": page_url,
                        "image_url": img_url,
                        "credit": page_url,
                        "accessed_at": time.strftime("%Y-%m-%d %H:%M:%S"),
                        "file_size": os.path.getsize(filepath)
                    })
                    print(f"✅ Đã lưu: {filepath}")
            except Exception as e:
                print(f"❌ Lỗi tải ảnh {img_url}: {e}")

    # Lưu metadata
    with open(os.path.join(BASE_DIR, "images.json"), "w", encoding="utf-8") as f:
        json.dump(downloaded_images, f, ensure_ascii=False, indent=2)
    
    print(f"🎉 Hoàn thành! Đã tải {len(downloaded_images)} ảnh → public/assets/images.json")

if __name__ == "__main__":
    run()
