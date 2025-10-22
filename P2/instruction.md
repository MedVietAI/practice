# 📚 HƯỚNG DẪN TẠO TRUYỆN TRANH - KỶ NIỆM 80 NĂM QUỐC KHÁNH

## 📋 TỔNG QUAN DỰ ÁN

**Chủ đề:** Tổng kết, phân tích các hoạt động chào mừng kỷ niệm **80 năm Quốc khánh 2/9/2025** (toàn quốc)

**Sản phẩm:** Truyện tranh (comic) 5-10 trang, kích thước A4, có bìa, xuất bản dạng SVG vector

**Mục tiêu:** Sáng tạo truyện tranh mới, khai thác ảnh hợp lệ làm nền/khung cảnh, chèn thuyết minh-hội thoại mang tính giáo dục-truyền cảm hứng

---

## ⚠️ YÊU CẦU TUÂN THỦ TUYỆT ĐỐI

### 🖼️ Nguồn ảnh hợp lệ
* Ảnh **chỉ** được khai thác từ 3 nguồn chính thức:
  - **dangcongsan.vn** (Báo Đảng Cộng Sản)
  - **baochinhphu.vn** (Báo Chính Phủ) 
  - **vtv.vn** (Đài Truyền hình Việt Nam)
* **Không** sử dụng ảnh từ bất kỳ nguồn nào khác
* Phải lưu metadata đầy đủ (URL nguồn, ngày truy cập, credit)

### 🎨 Quy định đồ họa
* **Không** sử dụng **video** khai thác trên Internet
* Truyện tranh được tạo từ:
  - Ảnh hợp lệ từ 3 nguồn làm nền/khung cảnh
  - Đồ họa/hiệu ứng tự tạo (SVG)
  - Text và dialogue tự sinh

### 🏗️ Kiến trúc kỹ thuật
* Thành phẩm **serverless** (không backend)
* Chạy hoàn toàn trong môi trường Cursor
* **Chỉ** dùng các API được cung cấp:
  - **Text Generation**: Gemini 2.5 Pro/Flash
  - **Image Generation**: Imagen-4 (chỉ cho icon/đồ họa bổ trợ)
  - **Text-to-Speech**: gemini-2.5-pro-preview-tts (nếu cần)

### 📝 Nội dung và thông điệp
* Nội dung bằng **tiếng Việt**, trang trọng
* Khơi gợi **tự hào dân tộc**
* Nhấn mạnh **trách nhiệm công dân**
* Tông: **trang trọng – ấm áp – truyền cảm hứng**

---

## 🗂️ CẤU TRÚC THỦ MỤC DỰ ÁN

```
project/
├─ .env                      # API_KEY (không commit)
├─ sources/
│   └─ links.txt            # Danh sách URL bài viết từ 3 nguồn
├─ public/
│   ├─ assets/              # Ảnh tải về + images.json (metadata)
│   └─ voice/               # File MP3 TTS (nếu cần)
├─ out/
│   ├─ story.json           # Cốt truyện + thoại (JSON)
│   └─ story_full.txt       # Toàn bộ nội dung truyện
├─ dist/
│   └─ news_80nam_1080p.mp4 # Video xuất ra (Đề 1)
├─ comic/                   # Các trang SVG A4
├─ crawler.py               # Tool tải ảnh từ 3 nguồn
├─ gen_script.py            # Tool sinh kịch bản (Đề 1)
├─ tts.py                   # Tool tạo giọng đọc (Đề 1)
├─ make_video.py            # Tool dựng video (Đề 1)
├─ gen_story.py             # Tool sinh cốt truyện
└─ make_comic.py            # Tool tạo truyện tranh SVG
```

---

## 🔧 THIẾT LẬP MÔI TRƯỜNG

### 📁 Tạo cấu trúc thư mục
```bash
mkdir -p project/{sources,public/assets,public/voice,out,dist,comic}
```

### 🔑 Cấu hình API Key
Tạo file `.env`:
```bash
API_KEY=sk-xxxxxx
```

### 🐍 Cài đặt Python dependencies
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install requests beautifulsoup4 pillow pydub moviepy imageio-ffmpeg svgwrite
# (tuỳ chọn nếu render PNG từ SVG): pip install cairosvg
```

---

## 📰 BƯỚC 1: CHUẨN BỊ DANH SÁCH NGUỒN BÀI VIẾT

### 🎯 Mục tiêu
Thu thập URL từ 3 nguồn chính thức về các hoạt động kỷ niệm 80 năm Quốc khánh

### 📝 Thực hiện
1. Mở file `sources/links.txt`
2. **Chỉ dán** các URL từ 3 nguồn hợp lệ:
   - `https://dangcongsan.vn/...`
   - `https://baochinhphu.vn/...`
   - `https://vtv.vn/...`

### 🔍 Gợi ý phạm vi tìm kiếm
Tìm kiếm trong các chuyên mục:
- **Chính trị**: Lễ kỷ niệm, diễu binh, thượng cờ
- **Sự kiện**: Chương trình nghệ thuật, triển lãm
- **Xã hội**: Hoạt động tri ân, an sinh xã hội
- **Giáo dục**: Thi đua 80 năm, giáo dục truyền thống
- **Văn hóa**: Chương trình nghệ thuật, ánh sáng

### 📊 Yêu cầu số lượng
- Tối thiểu: **15-20 URL** từ mỗi nguồn
- Tổng cộng: **45-60 URL** để đảm bảo đủ ảnh chất lượng

---

## 🖼️ BƯỚC 2: TẢI ẢNH HỢP LỆ VÀ LƯU METADATA

### 🎯 Mục tiêu
Tự động tải ảnh từ các URL đã chuẩn bị và lưu metadata đầy đủ

### 💻 Tạo file `crawler.py`

```python
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
```

### 🚀 Chạy crawler
```bash
python crawler.py
```

### ✅ Kiểm tra kết quả
- File `public/assets/images.json` chứa metadata
- Thư mục `public/assets/` chứa các file ảnh
- Tối thiểu cần **20-30 ảnh** chất lượng để tạo truyện tranh

---

## 📖 BƯỚC 3: SINH CỐT TRUYỆN + THOẠI (JSON)

### 🎯 Mục tiêu
Tạo cốt truyện hấp dẫn với cấu trúc rõ ràng, phù hợp với định dạng truyện tranh

### 💻 Tạo file `gen_story.py`

```python
# gen_story.py
from openai import OpenAI
import os, json, re

# Khởi tạo client
client = OpenAI(
    api_key=os.getenv("API_KEY"), 
    base_url="https://api.thucchien.ai"
)

# Prompt chi tiết cho AI
PROMPT = {
    "role": "user",
    "content": (
        "Sáng tạo truyện tranh chủ đề 80 năm Quốc khánh 2/9/2025, tiếng Việt, 6–8 trang (bao gồm 1 trang bìa).\n"
        "Trả về JSON: {title, pages:[{page_no, kind: 'cover'|'story', page_title, narration, panels:[{role:'caption'|'dialogue', speaker?, text}]}]}.\n"
        "Tông: trang trọng – ấm áp – truyền cảm hứng, nêu giá trị độc lập – tự do – đoàn kết – đổi mới.\n"
        "Không nêu chi tiết chưa chắc chắn. Lời ngắn gọn, phù hợp bố cục tranh.\n"
        "Cấu trúc đề xuất:\n"
        "- Trang 1: Bìa (cover) - Tiêu đề + hình ảnh nổi bật\n"
        "- Trang 2-3: Lịch sử - Tóm tắt 80 năm qua\n"
        "- Trang 4-5: Hiện tại - Các hoạt động kỷ niệm\n"
        "- Trang 6-7: Tương lai - Khát vọng phát triển\n"
        "- Trang 8: Kết - Thông điệp đoàn kết\n"
        "Mỗi panel có tối đa 2-3 câu, dễ đọc, có ý nghĩa sâu sắc."
    )
}

def generate_story():
    """Sinh cốt truyện bằng AI"""
    try:
        print("🤖 Đang sinh cốt truyện...")
        response = client.chat.completions.create(
            model="gemini-2.5-pro",
            messages=[PROMPT]
        )
        
        text = response.choices[0].message.content
        print("✅ AI đã sinh cốt truyện")
        
        # Lưu toàn bộ response
        os.makedirs("out", exist_ok=True)
        with open("out/story_full.txt", "w", encoding="utf-8") as f:
            f.write(text)
        
        # Trích xuất JSON
        json_match = re.search(r"\{[\s\S]*\}", text)
        if not json_match:
            raise SystemExit("❌ Không tìm thấy JSON trong phản hồi")
        
        story_data = json.loads(json_match.group(0))
        
        # Lưu JSON
        with open("out/story.json", "w", encoding="utf-8") as f:
            json.dump(story_data, f, ensure_ascii=False, indent=2)
        
        print("✅ story.json sẵn sàng")
        return story_data
        
    except Exception as e:
        print(f"❌ Lỗi khi sinh cốt truyện: {e}")
        return None

if __name__ == "__main__":
    generate_story()
```

### 🚀 Chạy story generator
```bash
python gen_story.py
```

### 📋 Cấu trúc truyện mong đợi
```json
{
  "title": "Hành Trình 80 Năm - Tự Hào Việt Nam",
  "pages": [
    {
      "page_no": 1,
      "kind": "cover",
      "page_title": "Kỷ Niệm 80 Năm Quốc Khánh",
      "narration": "Một hành trình vĩ đại của dân tộc Việt Nam",
      "panels": []
    },
    {
      "page_no": 2,
      "kind": "story",
      "page_title": "Lịch Sử Hào Hùng",
      "narration": "Từ ngày 2/9/1945 đến nay...",
      "panels": [
        {
          "role": "caption",
          "text": "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập"
        },
        {
          "role": "dialogue",
          "speaker": "Bác Hồ",
          "text": "Nước Việt Nam có quyền hưởng tự do và độc lập"
        }
      ]
    }
  ]
}
```

---

## 🎨 BƯỚC 4: DỰNG TRANG A4 (SVG) TỪ ẢNH HỢP LỆ + THOẠI

### 🎯 Mục tiêu
Tạo truyện tranh chuyên nghiệp với định dạng SVG vector, có thể in ấn

### 💻 Tạo file `make_comic.py`

```python
# make_comic.py
import os, json, random, math
import svgwrite
from PIL import Image

# Cấu hình A4
W_mm, H_mm = 210, 297  # A4 mm
DPI = 300
PX_W, PX_H = int(W_mm/25.4*DPI), int(H_mm/25.4*DPI)
MARGIN = 40  # px

def load_data():
    """Tải dữ liệu cần thiết"""
    with open("public/assets/images.json", "r", encoding="utf-8") as f:
        images = json.load(f)
    
    with open("out/story.json", "r", encoding="utf-8") as f:
        story = json.load(f)
    
    return images, story

def choose_images(images, count):
    """Chọn ảnh ngẫu nhiên"""
    random.shuffle(images)
    selected = []
    for img in images:
        path = img["local_path"]
        if os.path.exists(path):
            selected.append(path)
            if len(selected) >= count:
                break
    return selected

def add_speech_bubble(dwg, group, x, y, w, h, text, tail_to=None):
    """Thêm bong bóng thoại"""
    # Bong bóng: hình chữ nhật bo góc + đuôi tam giác
    radius = 18
    group.add(dwg.rect(
        insert=(x, y), 
        size=(w, h), 
        rx=radius, 
        ry=radius, 
        fill='white', 
        stroke='black', 
        stroke_width=2, 
        opacity=0.92
    ))
    
    # Đuôi bong bóng
    if tail_to:
        tx, ty = tail_to
        group.add(dwg.polygon(
            points=[(x+w*0.3, y+h), (x+w*0.35, y+h+22), (tx, ty)], 
            fill='white', 
            stroke='black', 
            stroke_width=2
        ))
    
    # Text (SVG native)
    text_element = dwg.text("", insert=(x+16, y+34), fill='black', font_size=24, font_family='system-ui')
    
    # Wrap text theo độ dài ký tự
    line = ""
    max_chars = int((w-32)/12)
    
    for word in text.split():
        if len(line) + len(word) + 1 > max_chars:
            text_element.add(dwg.tspan(line, x=[x+16], dy=[28]))
            line = word
        else:
            line = (line + " " + word).strip()
    
    if line:
        text_element.add(dwg.tspan(line, x=[x+16], dy=[28]))
    
    group.add(text_element)

def create_cover_page(dwg, page_data, images):
    """Tạo trang bìa"""
    # Nền
    dwg.add(dwg.rect(insert=(0, 0), size=(PX_W, PX_H), fill="#f7f7f7"))
    
    # Tiêu đề trang
    title = page_data.get("page_title", "Trang bìa")
    dwg.add(dwg.text(
        title, 
        insert=(MARGIN, MARGIN+10), 
        font_size=36, 
        font_family='system-ui', 
        fill='#111'
    ))
    
    # Ảnh nền chính
    selected_images = choose_images(images, 1)
    if selected_images:
        img_path = selected_images[0]
        try:
            img = Image.open(img_path)
            iw, ih = img.size
            
            # Fit vào khung lớn
            box_w, box_h = PX_W - 2*MARGIN, PX_H - 3*MARGIN
            scale = min(box_w/iw, box_h/ih)
            rw, rh = int(iw*scale), int(ih*scale)
            x = (PX_W - rw)//2
            y = (PX_H - rh)//2
            
            dwg.add(dwg.image(href=img_path, insert=(x, y), size=(rw, rh)))
        except Exception as e:
            print(f"Lỗi khi tải ảnh {img_path}: {e}")
    
    # Text kỷ niệm
    dwg.add(dwg.text(
        "Kỷ niệm 80 năm Quốc khánh 2/9/2025", 
        insert=(MARGIN, PX_H-MARGIN), 
        font_size=28, 
        fill='#c00'
    ))

def create_story_page(dwg, page_data, images):
    """Tạo trang nội dung"""
    # Nền
    dwg.add(dwg.rect(insert=(0, 0), size=(PX_W, PX_H), fill="#f7f7f7"))
    
    # Tiêu đề trang
    title = page_data.get("page_title", "Trang")
    dwg.add(dwg.text(
        title, 
        insert=(MARGIN, MARGIN+10), 
        font_size=36, 
        font_family='system-ui', 
        fill='#111'
    ))
    
    # Bố cục 2-4 khung linh hoạt
    panels = page_data.get("panels", [])
    panel_count = min(4, max(2, len(panels)))
    selected_images = choose_images(images, panel_count)
    
    # Tính toán layout
    cols = 2 if panel_count >= 2 else 1
    rows = math.ceil(panel_count/cols)
    padding = 16
    
    panel_w = (PX_W - 2*MARGIN - (cols-1)*padding)//cols
    panel_h = (PX_H - 2*MARGIN - 60 - (rows-1)*padding)//rows
    
    # Tạo các panel
    for i in range(panel_count):
        row = i // cols
        col = i % cols
        
        x = MARGIN + col*(panel_w + padding)
        y = MARGIN + 40 + row*(panel_h + padding)
        
        # Khung panel
        dwg.add(dwg.rect(
            insert=(x, y), 
            size=(panel_w, panel_h), 
            fill='white', 
            stroke='#ddd'
        ))
        
        # Ảnh nền panel
        if i < len(selected_images):
            img_path = selected_images[i]
            dwg.add(dwg.image(
                href=img_path, 
                insert=(x, y), 
                size=(panel_w, panel_h), 
                preserveAspectRatio='xMidYMid slice'
            ))
        
        # Bong bóng thoại nếu có text
        if i < len(panels):
            panel_text = panels[i].get('text', '')
            if panel_text:
                bubble_x = x + 16
                bubble_y = y + 16
                bubble_w = panel_w - 32
                bubble_h = 110
                
                add_speech_bubble(
                    dwg, dwg, 
                    bubble_x, bubble_y, bubble_w, bubble_h, 
                    panel_text, 
                    tail_to=(x + panel_w*0.8, y + bubble_h + 20)
                )

def create_comic_pages():
    """Tạo tất cả trang truyện tranh"""
    images, story = load_data()
    
    os.makedirs("comic", exist_ok=True)
    
    for page_data in story.get("pages", []):
        page_no = page_data.get("page_no", 1)
        kind = page_data.get("kind", "story")
        
        # Tạo SVG
        dwg = svgwrite.Drawing(
            filename=f"comic/page_{page_no:02d}.svg", 
            size=(f"{PX_W}px", f"{PX_H}px")
        )
        
        if kind == 'cover':
            create_cover_page(dwg, page_data, images)
        else:
            create_story_page(dwg, page_data, images)
        
        # Footer credit + số trang
        footer = f"Nguồn ảnh: dangcongsan.vn · baochinhphu.vn · vtv.vn  —  Trang {page_no}"
        dwg.add(dwg.text(
            footer, 
            insert=(MARGIN, PX_H-MARGIN/2), 
            font_size=18, 
            fill='#555'
        ))
        
        dwg.save()
        print(f"✅ Đã tạo: {dwg.filename}")

def main():
    """Hàm chính"""
    print("🎨 Bắt đầu tạo truyện tranh...")
    create_comic_pages()
    print("🎉 Hoàn thành! Truyện tranh đã lưu trong thư mục comic/")

if __name__ == "__main__":
    main()
```

### 🚀 Chạy comic generator
```bash
python make_comic.py
```

### 📊 Kết quả
- File `comic/page_01.svg` … `page_N.svg` (A4, vector, in ấn được)
- Định dạng SVG vector, chất lượng cao
- Có thể in ở bất kỳ kích thước nào

---

## 🖼️ BƯỚC 5: CHUYỂN ĐỔI SANG PNG (TUỲ CHỌN)

### 🎯 Mục tiêu
Tạo file PNG để xem trước và chia sẻ dễ dàng

### 💻 Script chuyển đổi

```python
# convert_to_png.py
import glob
import cairosvg

def convert_svg_to_png():
    """Chuyển đổi tất cả SVG sang PNG"""
    svg_files = sorted(glob.glob('comic/page_*.svg'))
    
    for svg_file in svg_files:
        png_file = svg_file.replace('.svg', '.png')
        try:
            cairosvg.svg2png(
                url=svg_file, 
                write_to=png_file, 
                output_width=1240  # Độ phân giải xem nhanh
            )
            print(f"✅ Đã chuyển: {png_file}")
        except Exception as e:
            print(f"❌ Lỗi chuyển đổi {svg_file}: {e}")

if __name__ == "__main__":
    convert_svg_to_png()
```

### 🚀 Chạy converter
```bash
pip install cairosvg
python convert_to_png.py
```

---

## ✅ CHECKLIST NGHIỆM THU

### 📚 Cấu trúc truyện tranh
- [ ] 5–10 trang, có **1 trang bìa**
- [ ] Kích thước **A4** (SVG vector), có thể in
- [ ] Bố cục rõ ràng, dễ đọc

### 🖼️ Nguồn ảnh và metadata
- [ ] Ảnh chỉ từ 3 nguồn: dangcongsan.vn, baochinhphu.vn, vtv.vn
- [ ] Có credit footer trên mỗi trang
- [ ] Metadata đầy đủ trong `images.json`

### 📝 Nội dung và thông điệp
- [ ] Lời/narration ngắn gọn, giàu ý nghĩa
- [ ] Truyền cảm hứng, tôn vinh giá trị độc lập – tự do – đoàn kết
- [ ] Không dùng video/clip ngoài
- [ ] Chỉ ảnh tĩnh hợp lệ và đồ họa tự tạo

### 🎨 Chất lượng thiết kế
- [ ] Bong bóng thoại rõ ràng, dễ đọc
- [ ] Ảnh nền chất lượng cao
- [ ] Màu sắc phù hợp với chủ đề
- [ ] Layout cân đối, chuyên nghiệp

---

## 🚀 LỆNH CHẠY TÓM TẮT

```bash
# 1. Tải ảnh từ 3 nguồn hợp lệ
python crawler.py

# 2. Sinh cốt truyện
python gen_story.py

# 3. Tạo truyện tranh SVG
python make_comic.py

# 4. (Tuỳ chọn) Chuyển sang PNG
python convert_to_png.py
```

---

## 💡 MẸO HOÀN THIỆN

### 🎯 Tối ưu nội dung
- Mỗi panel tối đa 2-3 câu
- Lời thoại ngắn gọn, súc tích
- Cân bằng giữa narration và dialogue

### 🖼️ Cải thiện chất lượng ảnh
- Ưu tiên ảnh có độ phân giải cao
- Chọn ảnh phù hợp với nội dung từng trang
- Đảm bảo ảnh không bị mờ hoặc pixelated

### 🎨 Nâng cao thiết kế
- Sử dụng màu sắc nhất quán
- Tạo bong bóng thoại đa dạng
- Thêm hiệu ứng shadow cho text

---

## 🎯 THÔNG ĐIỆP TRUNG TÂM

### 🇻🇳 Tinh thần yêu nước
- Tôn vinh **ý chí độc lập – tự do**
- Biết ơn các thế hệ cha anh
- Khơi dậy **khát vọng phát triển** phồn vinh, hạnh phúc

### 🤝 Đại đoàn kết dân tộc
- Nhấn mạnh **sức mạnh gắn kết** toàn dân tộc
- Văn hóa tri ân, trách nhiệm công dân
- Tinh thần **đổi mới – sáng tạo**

### 📚 Giá trị giáo dục
- Tránh liệt kê khô khan
- Ưu tiên **giá trị – ý nghĩa** của hoạt động
- Lan tỏa nhân ái, hướng tới tương lai

---

## 🔒 CAM KẾT TUÂN THỦ

### ✅ Nguồn ảnh hợp lệ
- Chỉ dùng ảnh từ **dangcongsan.vn / baochinhphu.vn / vtv.vn**
- Lưu **images.json** làm bằng chứng
- Ghi **credit** rõ ràng trên mỗi trang

### ✅ Không sử dụng video ngoài
- Không tải/bóc tách **video** từ Internet
- Tự tạo hoàn toàn từ ảnh tĩnh + đồ họa SVG

### ✅ Serverless architecture
- Toàn bộ mã và sản phẩm **serverless**
- Tự chạy trong môi trường Cursor
- Không phụ thuộc backend

---

## 📖 CẤU TRÚC TRUYỆN ĐỀ XUẤT

### 📑 Trang 1: Bìa
- Tiêu đề chính: "Kỷ Niệm 80 Năm Quốc Khánh"
- Ảnh nền: Quốc kỳ hoặc lễ kỷ niệm
- Subtitle: "Hành Trình Tự Hào Dân Tộc"

### 📑 Trang 2-3: Lịch Sử
- Tóm tắt 80 năm qua
- Các mốc son lịch sử
- Thông điệp: "Từ độc lập đến phồn vinh"

### 📑 Trang 4-5: Hiện Tại
- Các hoạt động kỷ niệm
- Sự tham gia của nhân dân
- Thông điệp: "Đoàn kết, sáng tạo, phát triển"

### 📑 Trang 6-7: Tương Lai
- Khát vọng phát triển
- Trách nhiệm thế hệ trẻ
- Thông điệp: "Hướng tới tương lai tươi sáng"

### 📑 Trang 8: Kết
- Thông điệp đoàn kết
- Lời kêu gọi hành động
- Thông điệp: "Việt Nam mãi mãi tự hào"

---

**🎉 Chúc đội thi hoàn thành tác phẩm truyện tranh đậm chất tự hào, sáng tạo mà trang trọng — lan tỏa tinh thần 2/9! 🇻🇳**