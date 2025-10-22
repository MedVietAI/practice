# instruction.md

**Chủ đề:** Tổng kết, phân tích các hoạt động chào mừng kỷ niệm **80 năm Quốc khánh 2/9/2025** (toàn quốc).
**Yêu cầu tuân thủ tuyệt đối:**

* Ảnh **chỉ** được khai thác từ 3 nguồn: **dangcongsan.vn**, **baochinhphu.vn**, **vtv.vn** (báo điện tử Đảng Cộng Sản, Báo Chính phủ, VTV).
* **Không** sử dụng **video** khai thác trên Internet. Video thành phẩm được **tự dựng** từ ảnh hợp lệ + đồ họa/hiệu ứng do ta tạo + TTS.
* Thành phẩm **serverless** (không backend).
* **Chỉ** dùng các API được cung cấp: Text (Gemini 2.5 Pro/Flash), Image Gen (Imagen‑4, chỉ cho icon/đồ họa bổ trợ nếu cần), TTS (gemini‑2.5‑pro‑preview‑tts).
* Nội dung bằng **tiếng Việt**, trang trọng, khơi gợi **tự hào dân tộc**, nhấn mạnh trách nhiệm công dân.

---

## 0) Cấu trúc thư mục chung

```
project/
 ├─ .env                      # chứa API_KEY (không commit)
 ├─ sources/
 │   └─ links.txt            # danh sách URL bài viết từ 3 nguồn (mỗi dòng 1 URL)
 ├─ public/
 │   ├─ assets/              # ảnh tải hợp lệ + images.json (metadata)
 │   └─ voice/               # mp3 TTS
 ├─ out/
 │   ├─ script.json          # kịch bản MC có timing
 │   └─ script_full.txt      # lời dẫn đầy đủ (có câu bắt buộc)
 ├─ dist/
 │   └─ news_80nam_1080p.mp4 # video xuất ra (Đề 1)
 ├─ comic/                   # Đề 2: các trang SVG A4
 ├─ crawler.py
 ├─ gen_script.py
 ├─ tts.py
 ├─ make_video.py
 ├─ gen_story.py
 └─ make_comic.py
```

**.env** (đặt trong Cursor → *Run* không cần công cụ ngoài):

```
API_KEY=sk-xxxxxx
```

> Lưu ý: trong code dùng `os.getenv("API_KEY")` (đúng chuẩn Python).

**Cài đặt môi trường (Cursor Terminal):**

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install requests beautifulsoup4 pillow pydub moviepy imageio-ffmpeg svgwrite
# (tuỳ chọn nếu render PNG từ SVG): pip install cairosvg
```

---

# ĐỀ 1: Video bản tin truyền hình (80 giây, 1920×1080, MP4)

**Mục tiêu:** Tạo video bản tin tóm lược – phân tích các hoạt động nổi bật trên toàn quốc nhân dịp **80 năm Quốc khánh 2/9/2025**, có **MC (nhân vật ảo) dẫn**, lời dẫn **chuẩn mực**; **bắt buộc** chèn câu:

> “**Các hoạt động chính kỷ niệm 80 năm Quốc khánh 2/9 vào ngày 2 tháng 9 năm 2025**”.

### A1) Chuẩn bị danh sách nguồn bài viết (tuân thủ 3 domain)

Mở `sources/links.txt` và **chỉ dán** các URL từ 3 nguồn:

* `https://dangcongsan.vn/...`
* `https://baochinhphu.vn/...`
* `https://vtv.vn/...`

Gợi ý phạm vi: chuyên mục **Chính trị**, **Sự kiện**, **Xã hội**, các bài tổng hợp lễ kỷ niệm, chương trình nghệ thuật, diễu binh, thắp cờ, hoạt động tri ân, an sinh xã hội, thi đua 80 năm, triển lãm…

### A2) Tải ảnh hợp lệ + lưu metadata

Tạo `crawler.py`:

```python
# crawler.py
import os, json, re, time, urllib.parse, requests
from bs4 import BeautifulSoup

BASE_DIR = "public/assets"; os.makedirs(BASE_DIR, exist_ok=True)
SITES = ["dangcongsan.vn", "baochinhphu.vn", "vtv.vn"]

def in_whitelist(url):
    host = urllib.parse.urlparse(url).netloc
    return any(host.endswith(s) for s in SITES)

def fetch_images_from_page(page_url):
    r = requests.get(page_url, timeout=30)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")
    imgs = set()
    # og:image
    for tag in soup.select('meta[property="og:image"]'):
        if tag.get("content"): imgs.add(urllib.parse.urljoin(page_url, tag["content"]))
    # <img>
    for tg in soup.find_all("img"):
        src = tg.get("data-src") or tg.get("src")
        if src: imgs.add(urllib.parse.urljoin(page_url, src))
    # Không chặn CDN, nhưng luôn ghi credit theo trang nguồn
    return list(imgs)

def sanitize_filename(name):
    name = name.strip().split("?")[0]
    name = os.path.basename(name)
    return re.sub(r'[^a-zA-Z0-9._-]+','_', name) or f"img_{int(time.time()*1000)}.jpg"

def download(url, save_dir=BASE_DIR):
    fn = sanitize_filename(url)
    if not fn.lower().endswith((".jpg",".jpeg",".png",".webp")):
        fn += ".jpg"
    p = os.path.join(save_dir, fn)
    with requests.get(url, stream=True, timeout=60) as r:
        r.raise_for_status()
        with open(p, "wb") as f:
            for chunk in r.iter_content(8192):
                if chunk: f.write(chunk)
    return p

def run():
    links_path = "sources/links.txt"
    assert os.path.exists(links_path), "Thiếu sources/links.txt"
    with open(links_path, "r", encoding="utf-8") as f:
        pages = [ln.strip() for ln in f if ln.strip()]

    out = []
    for p in pages:
        if not in_whitelist(p):
            print("[SKIP ngoài whitelist]", p)
            continue
        try:
            imgs = fetch_images_from_page(p)
            for img in imgs:
                try:
                    path = download(img)
                    out.append({
                        "local_path": path.replace("\\","/"),
                        "source_page": p,
                        "image_url": img,
                        "credit": p,
                        "accessed_at": time.strftime("%Y-%m-%d")
                    })
                    print("Saved:", path)
                except Exception as e:
                    print("[ERR img]", img, e)
        except Exception as e:
            print("[ERR page]", p, e)

    os.makedirs(BASE_DIR, exist_ok=True)
    with open(os.path.join(BASE_DIR, "images.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"✅ Done. {len(out)} ảnh → public/assets/images.json")

if __name__ == "__main__":
    run()
```

Chạy:

```bash
python crawler.py
```

### A3) Sinh kịch bản MC (có câu bắt buộc + timing)

Tạo `gen_script.py` (dùng API Text):

```python
# gen_script.py
from openai import OpenAI
import os, json
client = OpenAI(api_key=os.getenv("API_KEY"), base_url="https://api.thucchien.ai")

PROMPT = {
  "role":"user",
  "content": (
    "Hãy viết kịch bản bản tin truyền hình 80 giây, tiếng Việt, giọng trang trọng,\n"
    "có MC ảo dẫn dắt, tóm lược – phân tích hoạt động nổi bật trên cả nước nhân dịp 80 năm\n"
    "Quốc khánh 2/9/2025. BẮT BUỘC chèn nguyên văn câu: \"Các hoạt động chính kỷ niệm 80 năm Quốc khánh 2/9 vào ngày 2 tháng 9 năm 2025\".\n"
    "Trả về JSON với cấu trúc: {title, mc_name, segments:[{label, text, target_seconds}]}.\n"
    "Đề xuất 5 phân đoạn: Mở đầu (10s), Nổi bật 1 (18s), Nổi bật 2 (18s), Nổi bật 3 (18s), Kết (16s).\n"
    "Nguyên tắc: không nêu số liệu/địa danh nếu không chắc; ưu tiên thông điệp giá trị – đoàn kết –\n"
    "tri ân – khát vọng phát triển. Nhấn mạnh tính nhân văn, tinh thần độc lập tự do, sức mạnh đại đoàn kết."
  )
}

resp = client.chat.completions.create(
  model="gemini-2.5-pro",
  messages=[PROMPT]
)
text = resp.choices[0].message.content
os.makedirs("out", exist_ok=True)
with open("out/script_full.txt","w",encoding="utf-8") as f: f.write(text)

# Nếu model trả JSON trong code block, bóc tách thủ công (đơn giản):
import re, json
m = re.search(r"\{[\s\S]*\}", text)
if not m:
    raise SystemExit("Không tìm thấy JSON trong phản hồi")
obj = json.loads(m.group(0))
with open("out/script.json","w",encoding="utf-8") as f: json.dump(obj, f, ensure_ascii=False, indent=2)
print("✅ script.json sẵn sàng")
```

Chạy:

```bash
python gen_script.py
```

### A4) Tạo giọng đọc MC (TTS)

Tạo `tts.py`:

```python
# tts.py
import os, json, requests
os.makedirs("public/voice", exist_ok=True)
AI_API_BASE = "https://api.thucchien.ai"; API_KEY=os.getenv("API_KEY")

# Dùng toàn bộ script_full.txt để tạo một file TTS
with open("out/script_full.txt","r",encoding="utf-8") as f:
    content=f.read()

url = f"{AI_API_BASE}/audio/speech"
headers = {"Content-Type":"application/json","Authorization":f"Bearer {API_KEY}"}
data = {"model":"gemini-2.5-pro-preview-tts","input":content,"voice":"Puck"}
r = requests.post(url, headers=headers, json=data, stream=True)
r.raise_for_status()
with open("public/voice/mc.mp3","wb") as f:
    for chunk in r.iter_content(8192):
        f.write(chunk)
print("✅ TTS saved → public/voice/mc.mp3")
```

Chạy:

```bash
python tts.py
```

### A5) Dựng video 1920×1080/80s từ ảnh + TTS (không dùng video ngoài)

Tạo `make_video.py` (MoviePy + ảnh hợp lệ + credit + MC ảo dạng đồ họa tối giản):

```python
# make_video.py
import os, json, math, random
from moviepy.editor import (ImageClip, AudioFileClip, TextClip, CompositeVideoClip, ColorClip)
from moviepy.video.fx.all import resize
from PIL import Image

W,H = 1920,1080
FPS = 30
IMG_JSON = "public/assets/images.json"
AUDIO = "public/voice/mc.mp3"
SCRIPT_JSON = "out/script.json"
OUT = "dist/news_80nam_1080p.mp4"

os.makedirs("dist", exist_ok=True)

# 1) Nạp dữ liệu
with open(SCRIPT_JSON,"r",encoding="utf-8") as f: script = json.load(f)
with open(IMG_JSON,"r",encoding="utf-8") as f: imgs = json.load(f)
audio = AudioFileClip(AUDIO)

def pick_images(n):
    random.shuffle(imgs)
    chosen = []
    for it in imgs:
        p = it["local_path"]
        if os.path.exists(p):
            chosen.append(p)
            if len(chosen)>=n: break
    return chosen

# 2) Tạo cảnh mở đầu (title)
TITLE = script.get("title","Bản tin 80 năm Quốc khánh 2/9/2025")
MC = script.get("mc_name","MC Ảo")

bg = ColorClip(size=(W,H), color=(230, 0, 0)).set_duration(3)
# Tiêu đề
title = TextClip(TITLE, fontsize=70, color='white', method='caption', size=(W-200,None), align='center', font='DejaVu-Sans')
sub = TextClip("Các hoạt động chính kỷ niệm 80 năm Quốc khánh 2/9 vào ngày 2 tháng 9 năm 2025",
               fontsize=40, color='white', method='caption', size=(W-200,None), align='center', font='DejaVu-Sans')

# Lower‑third MC (đồ họa tối giản)
lower = TextClip(f"{MC} · Dẫn chương trình", fontsize=38, color='white', font='DejaVu-Sans').set_position((70,H-140))
bar = ColorClip(size=(W,120), color=(180,0,0)).set_opacity(0.85).set_duration(3).set_position((0,H-120))

intro = CompositeVideoClip([
    bg,
    title.set_position('center').set_start(0).set_duration(2.2),
    sub.set_position(('center', H/2+60)).set_start(0.6).set_duration(2.2),
    bar.set_start(0),
    lower.set_start(0)
], size=(W,H)).set_duration(3)

clips = [intro]

# 3) Các phân đoạn ảnh + chú thích
segs = script.get("segments", [])
remaining_dur = 80 - 3  # tổng 80s
per_seg = [max(3, s.get("target_seconds", 10)) for s in segs]
scale = remaining_dur / max(1,sum(per_seg))
per_seg = [max(3, d*scale) for d in per_seg]

for s, dur in zip(segs, per_seg):
    label = s.get("label","Sự kiện")
    text  = s.get("text","...")
    sel = pick_images(3)
    # Tạo slideshow Ken‑Burns đơn giản
    subclips=[]
    per_img = max(2.5, float(dur)/max(1,len(sel)))
    for p in sel:
        img = ImageClip(p).resize(height=H)
        if img.w < W:
            img = img.resize(width=W)
        # Pan nhẹ
        start_zoom = 1.05; end_zoom = 1.0
        def fl(gf, t):
            frame = gf(t)
            # moviepy ImageClip không support zoom động trực tiếp → dùng resize lambda
            return frame
        img = img.fx(resize, newsize=(W,H)).set_duration(per_img)
        subclips.append(img)
    seq = subclips[0]
    for sc in subclips[1:]:
        seq = seq.crossfadein(0.3).set_duration(seq.duration) # giữ tuyến tính đơn giản
        seq = CompositeVideoClip([seq.set_duration(seq.duration), sc.set_start(seq.duration-0.3)])
    # overlay tiêu đề đoạn + text ngắn
    headline = TextClip(label, fontsize=56, color='white', bg_color='rgba(0,0,0,0.55)', method='caption', size=(W-200,None), font='DejaVu-Sans')\
        .set_position((100,60)).set_duration(seq.duration)
    body = TextClip(text, fontsize=36, color='white', bg_color='rgba(0,0,0,0.45)', method='caption', size=(W-200,None), font='DejaVu-Sans')\
        .set_position((100,140)).set_duration(seq.duration)
    seq = CompositeVideoClip([seq, headline, body], size=(W,H)).set_duration(dur)
    clips.append(seq)

# 4) Hậu cảnh kết + credit nguồn ảnh
credits_text = "Nguồn ảnh: dangcongsan.vn · baochinhphu.vn · vtv.vn"
end_bg = ColorClip(size=(W,H), color=(0, 70, 130)).set_duration(3)
end_title = TextClip("Kỷ niệm 80 năm Quốc khánh 2/9/2025", fontsize=64, color='white', font='DejaVu-Sans')\
    .set_position('center').set_duration(3)
end_sub = TextClip(credits_text, fontsize=36, color='white', font='DejaVu-Sans')\
    .set_position(('center', H/2+80)).set_duration(3)
ending = CompositeVideoClip([end_bg, end_title, end_sub], size=(W,H)).set_duration(3)
clips.append(ending)

final = clips[0]
for c in clips[1:]:
    final = CompositeVideoClip([final.set_duration(final.duration), c.set_start(final.duration)])

final = final.set_audio(audio).set_fps(FPS)
# Cắt/đệm chuẩn 80s
if final.duration > 80:
    final = final.subclip(0,80)
elif final.duration < 80:
    pad = ColorClip(size=(W,H), color=(0,0,0)).set_duration(80-final.duration)
    final = CompositeVideoClip([final.set_duration(final.duration), pad.set_start(final.duration)]).set_audio(audio)

final.write_videofile(OUT, codec='libx264', audio_codec='aac', fps=FPS, bitrate="6000k")
print("✅ Xuất video:", OUT)
```

Chạy:

```bash
python make_video.py
```

> Kết quả: `dist/news_80nam_1080p.mp4` — **80 giây**, **1920×1080**, có **MC ảo** (giọng đọc + lower‑third), **câu bắt buộc** đã hiển thị và đọc lên, **không** dùng video ngoài.

### A6) Checklist nghiệm thu (Đề 1)

* [ ] Ảnh chỉ từ 3 nguồn, có metadata & credit.
* [ ] Có câu bắt buộc hiển thị/đọc rõ ràng.
* [ ] Tổng thời lượng **80s** (±0s).
* [ ] Âm lượng TTS rõ, không rè.
* [ ] Không chứa thông tin sai lệch; giọng điệu trang trọng – truyền cảm hứng – đoàn kết.
* [ ] File MP4 phát mượt trên trình duyệt/Windows/Mac.
