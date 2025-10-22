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

# ĐỀ 2: Truyện tranh (comic) 5–10 trang, A4, có bìa

**Mục tiêu:** Sáng tạo một **truyện tranh** mới, khai thác **ảnh hợp lệ** làm nền/khung cảnh, chèn **thuyết minh – hội thoại** mang tính giáo dục – truyền cảm hứng về 80 năm Quốc khánh.
**Kích thước:** A4 (SVG vector, 210×297mm; có thể in). **Trang:** 5–10 (bao gồm 1 **trang bìa**).

> Lưu ý: Ảnh nền/khung cảnh lấy từ `public/assets/images.json` (crawler ở A2). Icon/đồ họa nhỏ (ngôi sao, dải băng) có thể vẽ **SVG** (không cần AI‑image). Nếu cần minh họa biểu tượng trừu tượng, có thể dùng Imagen‑4 nhưng **không thay thế** ảnh khai thác chính.

### B1) Sinh cốt truyện + thoại (JSON)

Tạo `gen_story.py`:

```python
# gen_story.py
from openai import OpenAI
import os, json
client = OpenAI(api_key=os.getenv("API_KEY"), base_url="https://api.thucchien.ai")

PROMPT = {
  "role":"user",
  "content": (
    "Sáng tạo truyện tranh chủ đề 80 năm Quốc khánh 2/9/2025, tiếng Việt, 6–8 trang (bao gồm 1 trang bìa).\n"
    "Trả về JSON: {title, pages:[{page_no, kind: 'cover'|'story', page_title, narration, panels:[{role:'caption'|'dialogue', speaker?, text}]}]}.\n"
    "Tông: trang trọng – ấm áp – truyền cảm hứng, nêu giá trị độc lập – tự do – đoàn kết – đổi mới.\n"
    "Không nêu chi tiết chưa chắc chắn. Lời ngắn gọn, phù hợp bố cục tranh."
  )
}

resp = client.chat.completions.create(
  model="gemini-2.5-pro",
  messages=[PROMPT]
)
text = resp.choices[0].message.content
import re, json
m = re.search(r"\{[\s\S]*\}", text)
if not m:
    raise SystemExit("Không tìm thấy JSON")
obj = json.loads(m.group(0))
os.makedirs("out", exist_ok=True)
with open("out/story.json","w",encoding="utf-8") as f: json.dump(obj, f, ensure_ascii=False, indent=2)
print("✅ story.json sẵn sàng")
```

Chạy:

```bash
python gen_story.py
```

### B2) Dựng trang A4 (SVG) từ ảnh hợp lệ + thoại

Tạo `make_comic.py` (SVG vector, không phụ thuộc font ngoài):

```python
# make_comic.py
import os, json, random, math
import svgwrite
from PIL import Image

W_mm, H_mm = 210, 297  # A4 mm
DPI = 300
PX_W, PX_H = int(W_mm/25.4*DPI), int(H_mm/25.4*DPI)
MARGIN = 40  # px

with open("public/assets/images.json","r",encoding="utf-8") as f:
    images = json.load(f)
with open("out/story.json","r",encoding="utf-8") as f:
    story = json.load(f)

def choose_imgs(k):
    random.shuffle(images)
    out=[]
    for it in images:
        p=it["local_path"]
        if os.path.exists(p): out.append(p)
        if len(out)>=k: break
    return out

def add_speech(dwg, g, x, y, w, h, text, tail_to=None):
    # Balloon: rect với bo góc + đuôi tam giác đơn giản
    r=18
    g.add(dwg.rect(insert=(x,y), size=(w,h), rx=r, ry=r, fill='white', stroke='black', stroke_width=2, opacity=0.92))
    if tail_to:
        tx,ty = tail_to
        g.add(dwg.polygon(points=[(x+w*0.3,y+h),(x+w*0.35,y+h+22),(tx,ty)], fill='white', stroke='black', stroke_width=2))
    # Text (SVG native)
    text_el = dwg.text("", insert=(x+16, y+34), fill='black', font_size=24, font_family='system-ui')
    # wrap thô theo độ dài ký tự
    line=""; maxc=int((w-32)/12)
    for word in text.split():
        if len(line)+len(word)+1>maxc:
            text_el.add(dwg.tspan(line, x=[x+16], dy=[28]))
            line=word
        else:
            line = (line+" "+word).strip()
    if line:
        text_el.add(dwg.tspan(line, x=[x+16], dy=[28]))
    g.add(text_el)

os.makedirs("comic", exist_ok=True)

for page in story.get("pages",[]):
    pno = page.get("page_no",1)
    kind = page.get("kind","story")
    title = page.get("page_title","Trang")
    dwg = svgwrite.Drawing(filename=f"comic/page_{pno:02d}.svg", size=(f"{PX_W}px", f"{PX_H}px"))
    dwg.add(dwg.rect(insert=(0,0), size=(PX_W,PX_H), fill="#f7f7f7"))

    # Tiêu đề trang
    dwg.add(dwg.text(title, insert=(MARGIN, MARGIN+10), font_size=36, font_family='system-ui', fill='#111'))

    if kind == 'cover':
        sel = choose_imgs(1)
        if sel:
            img_path = sel[0]
            img = Image.open(img_path)
            iw, ih = img.size
            # fit vào khung lớn
            box_w, box_h = PX_W - 2*MARGIN, PX_H - 3*MARGIN
            scale = min(box_w/iw, box_h/ih)
            rw, rh = int(iw*scale), int(ih*scale)
            x = (PX_W - rw)//2; y = (PX_H - rh)//2
            dwg.add(dwg.image(href=img_path, insert=(x,y), size=(rw,rh)))
        dwg.add(dwg.text("Kỷ niệm 80 năm Quốc khánh 2/9/2025", insert=(MARGIN, PX_H-MARGIN), font_size=28, fill='#c00'))
    else:
        # Bố cục 2–4 khung linh hoạt
        panels = page.get("panels", [])
        k = min(4, max(2, len(panels)))
        sel = choose_imgs(k)
        cols = 2 if k>=2 else 1
        rows = math.ceil(k/cols)
        pad = 16
        pw = (PX_W - 2*MARGIN - (cols-1)*pad)//cols
        ph = (PX_H - 2*MARGIN - 60 - (rows-1)*pad)//rows
        idx=0
        for r in range(rows):
            for c in range(cols):
                if idx>=k: break
                x = MARGIN + c*(pw+pad)
                y = MARGIN + 40 + r*(ph+pad)
                dwg.add(dwg.rect(insert=(x,y), size=(pw,ph), fill='white', stroke='#ddd'))
                # Ảnh nền panel
                img_path = sel[idx]
                dwg.add(dwg.image(href=img_path, insert=(x,y), size=(pw,ph), preserveAspectRatio='xMidYMid slice'))
                # Balloon nếu có text
                if idx < len(panels):
                    text = panels[idx].get('text','')
                    if text:
                        bx,by,bw,bh = x+16, y+16, pw-32, 110
                        add_speech(dwg, dwg, bx,by,bw,bh,text, tail_to=(x+pw*0.8, y+bh+20))
                idx+=1

    # Footer credit + số trang
    footer = f"Nguồn ảnh: dangcongsan.vn · baochinhphu.vn · vtv.vn  —  Trang {pno}"
    dwg.add(dwg.text(footer, insert=(MARGIN, PX_H-MARGIN/2), font_size=18, fill='#555'))
    dwg.save()
    print("✅", dwg.filename)
```

Chạy:

```bash
python make_comic.py
```

Kết quả: `comic/page_01.svg` … `page_N.svg` (A4, vector, in ấn được).

> Nếu cần PNG nhanh để xem: cài `cairosvg` rồi:

```bash
python - <<'PY'
import glob, cairosvg
for f in sorted(glob.glob('comic/page_*.svg')):
    png = f.replace('.svg','.png')
    cairosvg.svg2png(url=f, write_to=png, output_width=1240)  # xem nhanh
    print('→', png)
PY
```

### B3) Checklist nghiệm thu (Đề 2)

* [ ] 5–10 trang, có **1 trang bìa**.
* [ ] Kích thước **A4** (SVG vector), có thể in.
* [ ] Ảnh chỉ từ 3 nguồn, có credit footer.
* [ ] Lời/narration ngắn gọn, giàu ý nghĩa – truyền cảm hứng – tôn vinh giá trị độc lập – tự do – đoàn kết.
* [ ] Không dùng video/clip ngoài; chỉ ảnh tĩnh hợp lệ và đồ họa do ta tạo.

---

## Phong cách nội dung & Thông điệp trung tâm

* Tôn vinh **ý chí độc lập – tự do**; biết ơn các thế hệ cha anh; khơi dậy **khát vọng phát triển phồn vinh, hạnh phúc**.
* Nhấn mạnh **đại đoàn kết dân tộc**, văn hóa tri ân, trách nhiệm công dân, tinh thần **đổi mới – sáng tạo**.
* Tránh liệt kê khô khan: ưu tiên **giá trị – ý nghĩa** của hoạt động (giáo dục truyền thống, lan tỏa nhân ái, hướng tới tương lai).

## Cam kết tuân thủ & bảo toàn tính hợp lệ

* Chỉ dùng ảnh từ **dangcongsan.vn / baochinhphu.vn / vtv.vn**; lưu **images.json** làm bằng chứng.
* Ghi **credit** rõ ràng trong video (ending) và truyện tranh (footer).
* Không tải/bóc tách **video** từ Internet.
* Toàn bộ mã và sản phẩm **serverless**, tự chạy trong Cursor.

---

## Lệnh chạy tóm tắt

```bash
# 1) Crawler ảnh hợp lệ
python crawler.py

# 2) Đề 1: Kịch bản + TTS + Render video 80s
python gen_script.py
python tts.py
python make_video.py

# 3) Đề 2: Cốt truyện + Render SVG A4
python gen_story.py
python make_comic.py
```

> **Mẹo hoàn thiện:** Nếu kịch bản TTS dài > 80s, hãy chạy lại `gen_script.py` với yêu cầu rút gọn (≈180–200 từ). Nếu ngắn, có thể tăng thời lượng từng phân đoạn trong `script.json` hoặc thêm 1 cảnh tranh cổ động mở rộng giá trị.

**Chúc đội thi hoàn thành tác phẩm đậm chất tự hào, hiện đại mà trang trọng — lan tỏa tinh thần 2/9! 🇻🇳**
