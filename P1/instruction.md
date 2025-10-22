# 🎬 HƯỚNG DẪN TẠO VIDEO BẢN TIN TRUYỀN HÌNH - KỶ NIỆM 80 NĂM QUỐC KHÁNH

## 📋 TỔNG QUAN DỰ ÁN

**Chủ đề:** Tổng kết, phân tích các hoạt động chào mừng kỷ niệm **80 năm Quốc khánh 2/9/2025** (toàn quốc)

**Sản phẩm:** Video bản tin truyền hình chuyên nghiệp (80 giây, 1920×1080, MP4) với MC ảo dẫn chương trình

**Mục tiêu:** Tạo ra một video bản tin chất lượng cao, trang trọng, truyền cảm hứng về tinh thần yêu nước và đại đoàn kết dân tộc

---

## ⚠️ YÊU CẦU TUÂN THỦ TUYỆT ĐỐI

### 🖼️ Nguồn ảnh hợp lệ
* Ảnh **chỉ** được khai thác từ 3 nguồn chính thức:
  - **dangcongsan.vn** (Báo Đảng Cộng Sản)
  - **baochinhphu.vn** (Báo Chính Phủ) 
  - **vtv.vn** (Đài Truyền hình Việt Nam)
* **Không** sử dụng ảnh từ bất kỳ nguồn nào khác
* Phải lưu metadata đầy đủ (URL nguồn, ngày truy cập, credit)

### 🎥 Quy định video
* **Không** sử dụng **video** khai thác trên Internet
* Video thành phẩm được **tự dựng** từ:
  - Ảnh hợp lệ từ 3 nguồn
  - Đồ họa/hiệu ứng tự tạo
  - Text-to-Speech (TTS) cho lời dẫn

### 🏗️ Kiến trúc kỹ thuật
* Thành phẩm **serverless** (không backend)
* Chạy hoàn toàn trong môi trường Cursor
* **Chỉ** dùng các API được cung cấp:
  - **Text Generation**: Gemini 2.5 Pro/Flash
  - **Image Generation**: Imagen-4 (chỉ cho icon/đồ họa bổ trợ)
  - **Text-to-Speech**: gemini-2.5-pro-preview-tts

### 📝 Nội dung và thông điệp
* Nội dung bằng **tiếng Việt**, trang trọng
* Khơi gợi **tự hào dân tộc**
* Nhấn mạnh **trách nhiệm công dân**
* **Bắt buộc** chèn câu: *"Các hoạt động chính kỷ niệm 80 năm Quốc khánh 2/9 vào ngày 2 tháng 9 năm 2025"*

---

## 🗂️ CẤU TRÚC THỦ MỤC DỰ ÁN

```
project/
├─ .env                      # API_KEY (không commit)
├─ sources/
│   └─ links.txt            # Danh sách URL bài viết từ 3 nguồn
├─ public/
│   ├─ assets/              # Ảnh tải về + images.json (metadata)
│   └─ voice/               # File MP3 TTS
├─ out/
│   ├─ script.json          # Kịch bản MC có timing
│   └─ script_full.txt      # Lời dẫn đầy đủ (có câu bắt buộc)
├─ dist/
│   └─ news_80nam_1080p.mp4 # Video xuất ra
├─ crawler.py               # Tool tải ảnh từ 3 nguồn
├─ gen_script.py            # Tool sinh kịch bản
├─ tts.py                   # Tool tạo giọng đọc
└─ make_video.py            # Tool dựng video
```

---

## 🔧 THIẾT LẬP MÔI TRƯỜNG

### 📁 Tạo cấu trúc thư mục
```bash
mkdir -p project/{sources,public/assets,public/voice,out,dist}
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
- Tối thiểu cần **20-30 ảnh** chất lượng để dựng video

---

## 📝 BƯỚC 3: SINH KỊCH BẢN MC (CÓ CÂU BẮT BUỘC + TIMING)

### 🎯 Mục tiêu
Tạo kịch bản chuyên nghiệp cho MC ảo với cấu trúc thời gian chính xác

### 💻 Tạo file `gen_script.py`

```python
# gen_script.py
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
        "Hãy viết kịch bản bản tin truyền hình 80 giây, tiếng Việt, giọng trang trọng,\n"
        "có MC ảo dẫn dắt, tóm lược – phân tích hoạt động nổi bật trên cả nước nhân dịp 80 năm\n"
        "Quốc khánh 2/9/2025. BẮT BUỘC chèn nguyên văn câu: \"Các hoạt động chính kỷ niệm 80 năm Quốc khánh 2/9 vào ngày 2 tháng 9 năm 2025\".\n"
        "Trả về JSON với cấu trúc: {title, mc_name, segments:[{label, text, target_seconds}]}.\n"
        "Đề xuất 5 phân đoạn: Mở đầu (10s), Nổi bật 1 (18s), Nổi bật 2 (18s), Nổi bật 3 (18s), Kết (16s).\n"
        "Nguyên tắc: không nêu số liệu/địa danh nếu không chắc; ưu tiên thông điệp giá trị – đoàn kết –\n"
        "tri ân – khát vọng phát triển. Nhấn mạnh tính nhân văn, tinh thần độc lập tự do, sức mạnh đại đoàn kết.\n"
        "Lời dẫn phải tự nhiên, dễ đọc, phù hợp với tốc độ nói 150-180 từ/phút."
    )
}

def generate_script():
    """Sinh kịch bản bằng AI"""
    try:
        print("🤖 Đang sinh kịch bản...")
        response = client.chat.completions.create(
            model="gemini-2.5-pro",
            messages=[PROMPT]
        )
        
        text = response.choices[0].message.content
        print("✅ AI đã sinh kịch bản")
        
        # Lưu toàn bộ response
        os.makedirs("out", exist_ok=True)
        with open("out/script_full.txt", "w", encoding="utf-8") as f:
            f.write(text)
        
        # Trích xuất JSON
        json_match = re.search(r"\{[\s\S]*\}", text)
        if not json_match:
            raise SystemExit("❌ Không tìm thấy JSON trong phản hồi")
        
        script_data = json.loads(json_match.group(0))
        
        # Lưu JSON
        with open("out/script.json", "w", encoding="utf-8") as f:
            json.dump(script_data, f, ensure_ascii=False, indent=2)
        
        print("✅ script.json sẵn sàng")
        return script_data
        
    except Exception as e:
        print(f"❌ Lỗi khi sinh kịch bản: {e}")
        return None

if __name__ == "__main__":
    generate_script()
```

### 🚀 Chạy script generator
```bash
python gen_script.py
```

### 📋 Cấu trúc kịch bản mong đợi
```json
{
  "title": "Bản tin kỷ niệm 80 năm Quốc khánh 2/9/2025",
  "mc_name": "MC Ảo",
  "segments": [
    {
      "label": "Mở đầu",
      "text": "Chào mừng quý vị đến với bản tin đặc biệt...",
      "target_seconds": 10
    },
    {
      "label": "Hoạt động nổi bật 1",
      "text": "Các hoạt động chính kỷ niệm 80 năm Quốc khánh 2/9 vào ngày 2 tháng 9 năm 2025...",
      "target_seconds": 18
    }
  ]
}
```

---

## 🎤 BƯỚC 4: TẠO GIỌNG ĐỌC MC (TTS)

### 🎯 Mục tiêu
Chuyển đổi kịch bản thành giọng đọc tự nhiên, trang trọng

### 💻 Tạo file `tts.py`

```python
# tts.py
import os, json, requests

def create_tts():
    """Tạo file TTS từ kịch bản"""
    os.makedirs("public/voice", exist_ok=True)
    
    # Đọc toàn bộ kịch bản
    with open("out/script_full.txt", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Cấu hình API
    AI_API_BASE = "https://api.thucchien.ai"
    API_KEY = os.getenv("API_KEY")
    
    if not API_KEY:
        print("❌ Thiếu API_KEY trong .env")
        return
    
    # Gọi API TTS
    url = f"{AI_API_BASE}/audio/speech"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    data = {
        "model": "gemini-2.5-pro-preview-tts",
        "input": content,
        "voice": "Puck"  # Giọng nam, trang trọng
    }
    
    try:
        print("🎤 Đang tạo giọng đọc...")
        response = requests.post(url, headers=headers, json=data, stream=True)
        response.raise_for_status()
        
        # Lưu file MP3
        with open("public/voice/mc.mp3", "wb") as f:
            for chunk in response.iter_content(8192):
                f.write(chunk)
        
        print("✅ TTS đã lưu → public/voice/mc.mp3")
        
        # Kiểm tra thời lượng
        import mutagen
        audio = mutagen.File("public/voice/mc.mp3")
        if audio:
            duration = audio.info.length
            print(f"⏱️ Thời lượng: {duration:.1f} giây")
            
            if duration > 85:
                print("⚠️ Cảnh báo: Thời lượng vượt quá 80 giây!")
            elif duration < 70:
                print("⚠️ Cảnh báo: Thời lượng quá ngắn!")
        
    except Exception as e:
        print(f"❌ Lỗi khi tạo TTS: {e}")

if __name__ == "__main__":
    create_tts()
```

### 🚀 Chạy TTS generator
```bash
python tts.py
```

### 📊 Kiểm tra chất lượng
- File `public/voice/mc.mp3` có thời lượng ~80 giây
- Giọng đọc rõ ràng, không rè
- Tốc độ nói phù hợp (150-180 từ/phút)

---

## 🎬 BƯỚC 5: DỰNG VIDEO 1920×1080/80s

### 🎯 Mục tiêu
Tạo video chuyên nghiệp với MC ảo, ảnh nền, và hiệu ứng

### 💻 Tạo file `make_video.py`

```python
# make_video.py
import os, json, math, random
from moviepy.editor import (
    ImageClip, AudioFileClip, TextClip, CompositeVideoClip, 
    ColorClip, concatenate_videoclips
)
from moviepy.video.fx.all import resize
from PIL import Image

# Cấu hình video
W, H = 1920, 1080
FPS = 30
IMG_JSON = "public/assets/images.json"
AUDIO = "public/voice/mc.mp3"
SCRIPT_JSON = "out/script.json"
OUTPUT = "dist/news_80nam_1080p.mp4"

def load_data():
    """Tải dữ liệu cần thiết"""
    with open(SCRIPT_JSON, "r", encoding="utf-8") as f:
        script = json.load(f)
    
    with open(IMG_JSON, "r", encoding="utf-8") as f:
        images = json.load(f)
    
    audio = AudioFileClip(AUDIO)
    
    return script, images, audio

def pick_images(images, count):
    """Chọn ảnh ngẫu nhiên"""
    random.shuffle(images)
    chosen = []
    for img in images:
        path = img["local_path"]
        if os.path.exists(path):
            chosen.append(path)
            if len(chosen) >= count:
                break
    return chosen

def create_title_slide(script):
    """Tạo slide tiêu đề"""
    title = script.get("title", "Bản tin 80 năm Quốc khánh 2/9/2025")
    mc_name = script.get("mc_name", "MC Ảo")
    
    # Nền đỏ Việt Nam
    bg = ColorClip(size=(W, H), color=(230, 0, 0)).set_duration(3)
    
    # Tiêu đề chính
    title_clip = TextClip(
        title, 
        fontsize=70, 
        color='white', 
        method='caption', 
        size=(W-200, None), 
        align='center', 
        font='DejaVu-Sans'
    ).set_position('center').set_duration(2.2)
    
    # Câu bắt buộc
    mandatory_text = "Các hoạt động chính kỷ niệm 80 năm Quốc khánh 2/9 vào ngày 2 tháng 9 năm 2025"
    subtitle_clip = TextClip(
        mandatory_text,
        fontsize=40, 
        color='white', 
        method='caption', 
        size=(W-200, None), 
        align='center', 
        font='DejaVu-Sans'
    ).set_position(('center', H/2+60)).set_duration(2.2)
    
    # Lower-third MC
    mc_clip = TextClip(
        f"{mc_name} · Dẫn chương trình", 
        fontsize=38, 
        color='white', 
        font='DejaVu-Sans'
    ).set_position((70, H-140))
    
    # Thanh đỏ dưới
    bar = ColorClip(size=(W, 120), color=(180, 0, 0)).set_opacity(0.85).set_duration(3)
    
    return CompositeVideoClip([
        bg, title_clip, subtitle_clip, bar, mc_clip
    ], size=(W, H)).set_duration(3)

def create_content_segment(segment, images, duration):
    """Tạo phân đoạn nội dung"""
    label = segment.get("label", "Sự kiện")
    text = segment.get("text", "...")
    
    # Chọn ảnh
    selected_images = pick_images(images, 3)
    if not selected_images:
        raise SystemExit("❌ Không có ảnh để dựng video")
    
    # Tạo slideshow
    subclips = []
    per_image = max(2.5, duration / len(selected_images))
    
    for img_path in selected_images:
        img = ImageClip(img_path).resize(height=H)
        if img.w < W:
            img = img.resize(width=W)
        
        img = img.set_duration(per_image)
        subclips.append(img)
    
    # Ghép ảnh với crossfade
    if len(subclips) > 1:
        sequence = subclips[0]
        for clip in subclips[1:]:
            sequence = concatenate_videoclips([sequence, clip])
    else:
        sequence = subclips[0]
    
    # Overlay text
    headline = TextClip(
        label, 
        fontsize=56, 
        color='white', 
        bg_color='rgba(0,0,0,0.55)', 
        method='caption', 
        size=(W-200, None), 
        font='DejaVu-Sans'
    ).set_position((100, 60)).set_duration(sequence.duration)
    
    body = TextClip(
        text, 
        fontsize=36, 
        color='white', 
        bg_color='rgba(0,0,0,0.45)', 
        method='caption', 
        size=(W-200, None), 
        font='DejaVu-Sans'
    ).set_position((100, 140)).set_duration(sequence.duration)
    
    return CompositeVideoClip([sequence, headline, body], size=(W, H)).set_duration(duration)

def create_ending_slide():
    """Tạo slide kết thúc"""
    credits_text = "Nguồn ảnh: dangcongsan.vn · baochinhphu.vn · vtv.vn"
    
    end_bg = ColorClip(size=(W, H), color=(0, 70, 130)).set_duration(3)
    end_title = TextClip(
        "Kỷ niệm 80 năm Quốc khánh 2/9/2025", 
        fontsize=64, 
        color='white', 
        font='DejaVu-Sans'
    ).set_position('center').set_duration(3)
    
    end_sub = TextClip(
        credits_text, 
        fontsize=36, 
        color='white', 
        font='DejaVu-Sans'
    ).set_position(('center', H/2+80)).set_duration(3)
    
    return CompositeVideoClip([end_bg, end_title, end_sub], size=(W, H)).set_duration(3)

def main():
    """Hàm chính dựng video"""
    print("🎬 Bắt đầu dựng video...")
    
    # Tải dữ liệu
    script, images, audio = load_data()
    
    # Tạo thư mục output
    os.makedirs("dist", exist_ok=True)
    
    # Tạo các clip
    clips = []
    
    # 1. Slide tiêu đề
    title_clip = create_title_slide(script)
    clips.append(title_clip)
    
    # 2. Các phân đoạn nội dung
    segments = script.get("segments", [])
    remaining_time = 80 - 3  # Trừ thời gian tiêu đề
    
    # Tính thời gian cho mỗi segment
    target_times = [max(3, s.get("target_seconds", 10)) for s in segments]
    total_target = sum(target_times)
    
    if total_target > 0:
        scale = remaining_time / total_target
        actual_times = [max(3, t * scale) for t in target_times]
    else:
        actual_times = [remaining_time / len(segments)] * len(segments)
    
    for segment, duration in zip(segments, actual_times):
        content_clip = create_content_segment(segment, images, duration)
        clips.append(content_clip)
    
    # 3. Slide kết thúc
    ending_clip = create_ending_slide()
    clips.append(ending_clip)
    
    # Ghép tất cả clip
    final_video = concatenate_videoclips(clips)
    
    # Thêm âm thanh
    final_video = final_video.set_audio(audio).set_fps(FPS)
    
    # Đảm bảo đúng 80 giây
    if final_video.duration > 80:
        final_video = final_video.subclip(0, 80)
    elif final_video.duration < 80:
        # Thêm padding nếu cần
        padding = ColorClip(size=(W, H), color=(0, 0, 0)).set_duration(80 - final_video.duration)
        final_video = concatenate_videoclips([final_video, padding])
    
    # Xuất video
    print("📤 Đang xuất video...")
    final_video.write_videofile(
        OUTPUT, 
        codec='libx264', 
        audio_codec='aac', 
        fps=FPS, 
        bitrate="6000k",
        verbose=False,
        logger=None
    )
    
    print(f"🎉 Hoàn thành! Video đã lưu: {OUTPUT}")

if __name__ == "__main__":
    main()
```

### 🚀 Chạy video renderer
```bash
python make_video.py
```

### 📊 Thông số video đầu ra
- **Độ phân giải**: 1920×1080 (Full HD)
- **Thời lượng**: 80 giây chính xác
- **Bitrate**: 6000k (chất lượng cao)
- **Codec**: H.264 (tương thích rộng)
- **Audio**: AAC (chất lượng tốt)

---

## ✅ CHECKLIST NGHIỆM THU

### 🖼️ Nguồn ảnh và metadata
- [ ] Ảnh chỉ từ 3 nguồn: dangcongsan.vn, baochinhphu.vn, vtv.vn
- [ ] Có metadata đầy đủ trong `images.json`
- [ ] Ghi credit rõ ràng trong video

### 📝 Nội dung và kịch bản
- [ ] Có câu bắt buộc hiển thị và đọc rõ ràng
- [ ] Tổng thời lượng **80 giây** (±0s)
- [ ] Giọng điệu trang trọng, truyền cảm hứng
- [ ] Không chứa thông tin sai lệch

### 🎥 Chất lượng video
- [ ] Âm lượng TTS rõ ràng, không rè
- [ ] File MP4 phát mượt trên trình duyệt/Windows/Mac
- [ ] Độ phân giải 1920×1080
- [ ] Bitrate ≥ 6000k

### 🎨 Thiết kế và hiệu ứng
- [ ] MC ảo hiển thị đẹp với lower-third
- [ ] Ảnh nền chất lượng cao
- [ ] Text overlay dễ đọc
- [ ] Màu sắc phù hợp với chủ đề

---

## 🚀 LỆNH CHẠY TÓM TẮT

```bash
# 1. Tải ảnh từ 3 nguồn hợp lệ
python crawler.py

# 2. Sinh kịch bản MC
python gen_script.py

# 3. Tạo giọng đọc TTS
python tts.py

# 4. Dựng video hoàn chỉnh
python make_video.py
```

---

## 💡 MẸO HOÀN THIỆN

### 🎯 Tối ưu thời lượng
- Nếu TTS > 80s: Chạy lại `gen_script.py` với yêu cầu rút gọn
- Nếu TTS < 70s: Tăng thời lượng các phân đoạn trong `script.json`

### 🖼️ Cải thiện chất lượng ảnh
- Ưu tiên ảnh có độ phân giải cao
- Chọn ảnh có nội dung phù hợp với từng phân đoạn
- Đảm bảo ảnh không bị mờ hoặc pixelated

### 🎨 Nâng cao hiệu ứng
- Thêm transition mượt mà giữa các ảnh
- Sử dụng Ken Burns effect cho ảnh tĩnh
- Điều chỉnh opacity của text overlay

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
- Ghi **credit** rõ ràng trong video

### ✅ Không sử dụng video ngoài
- Không tải/bóc tách **video** từ Internet
- Tự dựng hoàn toàn từ ảnh tĩnh + TTS

### ✅ Serverless architecture
- Toàn bộ mã và sản phẩm **serverless**
- Tự chạy trong môi trường Cursor
- Không phụ thuộc backend
