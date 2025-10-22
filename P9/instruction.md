**Sản phẩm:** **Tờ gấp (flyer) A4 gấp ba** tuyên truyền nâng cao nhận thức về ngày 2/9.

* Kích thước trang: **A4** (210 × 297 mm).
* Gấp ba **kiểu brochure**: 3 panel dọc, mỗi panel ≈ **99 × 297 mm** (yêu cầu ~10 × 21 cm phù hợp).
* **Đầu ra:** **PDF/JPG** chất lượng in (300 dpi khuyến nghị), một mặt hoặc hai mặt tùy chọn.
* **Tuân thủ:** Ảnh **chỉ** từ 3 nguồn: **dangcongsan.vn**, **baochinhphu.vn**, **vtv.vn**. **Không** dùng video.

---

## 0) Mục tiêu & tinh thần

* Thông điệp **trang trọng – truyền cảm hứng**; tóm tắt ý nghĩa lịch sử 2/9, hoạt động tiêu biểu, định hướng công dân & cộng đồng (tri ân, đoàn kết, khát vọng phát triển).
* Tránh chi tiết chưa xác thực; tập trung giá trị – nhận thức – hành động tích cực.

## 1) Cấu trúc thư mục

```
flyer_tri_fold/
 ├─ .env                      # API_KEY=...
 ├─ sources/links.txt         # URL từ 3 nguồn hợp lệ
 ├─ public/assets/images.json # ảnh tải từ crawler
 ├─ out/flyer_content.json    # nội dung sinh bởi Gemini
 ├─ dist/flyer_tri_fold.svg   # bản thiết kế SVG
 ├─ dist/flyer_tri_fold.png   # ảnh in nhanh
 ├─ dist/flyer_tri_fold.pdf   # PDF in ấn
 ├─ crawler.py
 ├─ gen_flyer_text.py
 └─ make_flyer.py
```

## 2) Cài đặt

```bash
python -m venv flyer_tri_fold/.venv
source flyer_tri_fold/.venv/bin/activate
pip install requests beautifulsoup4 svgwrite pillow cairosvg
printf "API_KEY=sk-xxxx\n" > flyer_tri_fold/.env
```

## 3) Crawler ảnh (3 domain)

Dùng `crawler.py` như các đề trước (whitelist 3 domain) → lưu `public/assets/images.json`.
**Chạy:** `python crawler.py`

## 4) Sinh **nội dung flyer** (Gemini → JSON)

Tạo `gen_flyer_text.py`:

```python
from openai import OpenAI
import os, json, re
client = OpenAI(api_key=os.getenv("API_KEY"), base_url="https://api.thucchien.ai")
PROMPT={"role":"user","content":(
  "Soạn nội dung flyer A4 gấp ba tuyên truyền 2/9 (tiếng Việt).\n"
  "Trả JSON: {title, slogan, panels:[\n"
  " {id:'cover',heading,bullets:[...]},\n"
  " {id:'inside_left',heading,bullets:[...]},\n"
  " {id:'inside_middle',heading,bullets:[...]},\n"
  " {id:'inside_right',heading,bullets:[...]},\n"
  " {id:'back_left',heading,bullets:[...]},\n"
  " {id:'back_middle',heading,bullets:[...]},\n"
  " {id:'back_right',heading,bullets:[...]}\n"
  "]}.\n"
  "Giọng trang trọng, cô đọng, dễ đọc; tránh chi tiết chưa xác thực."
)}
resp = client.chat.completions.create(model='gemini-2.5-pro', messages=[PROMPT])
text = resp.choices[0].message.content
m=re.search(r"\{[\s\S]*\}", text)
if not m: raise SystemExit('Không thấy JSON')
obj=json.loads(m.group(0))
os.makedirs('out', exist_ok=True)
with open('out/flyer_content.json','w',encoding='utf-8') as f: json.dump(obj,f,ensure_ascii=False,indent=2)
print('✅ out/flyer_content.json sẵn sàng')
```

**Chạy:** `python gen_flyer_text.py`

## 5) Thiết kế SVG A4 gấp ba (mặt trước & sau)

* **Kích thước A4 @300 dpi:** 2480 × 3508 px.
* Panel width ≈ **827 px** mỗi panel (2480/3).
* **Lề an toàn:** ≥ 10 mm (~118 px) mỗi cạnh & mép gấp; **vùng chảy** (bleed) nếu nhà in yêu cầu (+3 mm).
* **Mặt trước** (ngoài): panel **cover** ở **bìa giữa** hoặc **bìa phải** tuỳ kiểu gấp (thường **bìa phải** nếu gấp hai lần).
* **Mặt trong**: 3 panel còn lại sắp xếp logic (trình bày nội dung chính).

Tạo `make_flyer.py` (vẽ bố cục, gán ảnh nền mờ từ `images.json`, chèn text từ `flyer_content.json`, vẽ đường gấp nét đứt **chỉ phiên bản hướng dẫn**, bản in **ẩn** đường gấp):

```python
import os, json, math, svgwrite
from PIL import Image

DPI=300
PX_W, PX_H = 2480, 3508
PANEL_W = PX_W//3
MARGIN = int(118)  # ~10mm

with open('out/flyer_content.json','r',encoding='utf-8') as f: CT=json.load(f)
with open('public/assets/images.json','r',encoding='utf-8') as f: IM=json.load(f)

os.makedirs('dist', exist_ok=True)

def pick_img():
    for it in IM:
        p=it['local_path']
        if os.path.exists(p): return p
    return None

COLORS = {
  'bg':'#f7f7f7','primary':'#b30000','accent':'#ffd200','text':'#111','muted':'#555'
}

def draw_panel(dwg, x, y, w, h, heading, bullets, bgimg=None):
    # nền
    dwg.add(dwg.rect(insert=(x,y), size=(w,h), fill=COLORS['bg']))
    # ảnh mờ
    if bgimg and os.path.exists(bgimg):
        dwg.add(dwg.image(href=bgimg, insert=(x,y), size=(w,h), preserveAspectRatio='xMidYMid slice', opacity=0.18))
    # heading
    dwg.add(dwg.text(heading, insert=(x+MARGIN, y+MARGIN+12), font_size=40, font_family='system-ui', fill=COLORS['primary']))
    # bullets
    tx = x+MARGIN; ty = y+MARGIN+64
    for b in bullets[:8]:
        dwg.add(dwg.text('• '+b, insert=(tx, ty), font_size=26, font_family='system-ui', fill=COLORS['text']))
        ty += 34

# MẶT NGOÀI (cover + back)
dwg = svgwrite.Drawing('dist/flyer_tri_fold.svg', size=(f"{PX_W}px", f"{PX_H}px"))
# Đường gấp (hướng dẫn):
dwg.add(dwg.line(start=(PANEL_W,0), end=(PANEL_W,PX_H), stroke='#ccc', stroke_dasharray='10,10'))
dwg.add(dwg.line(start=(PANEL_W*2,0), end=(PANEL_W*2,PX_H), stroke='#ccc', stroke_dasharray='10,10'))

title = CT.get('title','Kỷ niệm 80 năm Quốc khánh 2/9')
slogan = CT.get('slogan','Độc lập – Tự do – Hạnh phúc')

# Quy ước: panel phải = bìa (cover)
cover = next((p for p in CT['panels'] if p['id']=='cover'), {"heading":title, "bullets":[slogan]})
back_left = next((p for p in CT['panels'] if p['id']=='back_left'), {"heading":"Tri ân","bullets":[]})
back_mid  = next((p for p in CT['panels'] if p['id']=='back_middle'), {"heading":"Đại đoàn kết","bullets":[]})
back_right= next((p for p in CT['panels'] if p['id']=='back_right'), {"heading":"Hướng tới tương lai","bullets":[]})

# Từ trái→phải: back_left | back_middle | cover
imgs=[pick_img(), pick_img(), pick_img()]
draw_panel(dwg, 0, 0, PANEL_W, PX_H, back_left['heading'], back_left.get('bullets',[]), imgs[0])
draw_panel(dwg, PANEL_W, 0, PANEL_W, PX_H, back_mid['heading'], back_mid.get('bullets',[]), imgs[1])
# cover nổi bật hơn
x = PANEL_W*2
dwg.add(dwg.rect(insert=(x,0), size=(PANEL_W,PX_H), fill='#ffffff'))
dwg.add(dwg.image(href=imgs[2], insert=(x,0), size=(PANEL_W,PX_H), preserveAspectRatio='xMidYMid slice', opacity=0.22))
dwg.add(dwg.rect(insert=(x+MARGIN, MARGIN), size=(PANEL_W-2*MARGIN, 320), fill=COLORS['primary'], rx=18, ry=18, opacity=0.92))
dwg.add(dwg.text(cover['heading'], insert=(x+MARGIN*1.4, MARGIN+80), font_size=48, fill='#fff', font_family='system-ui'))
dwg.add(dwg.text(slogan, insert=(x+MARGIN*1.4, MARGIN+140), font_size=28, fill='#fff', font_family='system-ui'))

# Footer credit
credit = 'Nguồn ảnh: dangcongsan.vn · baochinhphu.vn · vtv.vn'
dwg.add(dwg.text(credit, insert=(MARGIN, PX_H-MARGIN/2), font_size=18, fill='#666'))

dwg.save()
print('✅ dist/flyer_tri_fold.svg')

# Xuất PNG & PDF
try:
    import cairosvg
    cairosvg.svg2png(url='dist/flyer_tri_fold.svg', write_to='dist/flyer_tri_fold.png', output_width=PX_W, output_height=PX_H)
    cairosvg.svg2pdf(url='dist/flyer_tri_fold.svg', write_to='dist/flyer_tri_fold.pdf')
    print('✅ Xuất PNG & PDF')
except Exception as e:
    print('⚠️ CairoSVG optional:', e)
```

**Chạy:** `python make_flyer.py`

> Nếu cần **mặt trong** riêng (đảo thứ tự panel cho đúng khi gấp), có thể nhân bản `make_flyer.py` thành `make_flyer_inside.py` với mapping `inside_left/middle/right` và xuất `dist/flyer_tri_fold_inside.(svg|pdf|png)`.

## 6) Nguyên tắc dàn trang & in ấn

* **Lề an toàn ≥ 10 mm**; không đặt chữ sát mép gấp/cắt.
* Font sans‑serif đậm nét; cỡ chữ bullet ≥ **9–10 pt** ở 300 dpi (≈ 12–14 px hiển thị).
* Tương phản cao; hạn chế chữ trắng trên nền ảnh nếu không đặt lớp mờ.
* Nếu nhà in yêu cầu **bleed**: tăng kích thước mỗi cạnh **+3 mm** và kéo nền tràn mép; chữ vẫn trong vùng an toàn.

## 7) Checklist nghiệm thu

* [ ] Ảnh **chỉ** từ 3 nguồn; có credit.
* [ ] Bố cục đúng **A4 gấp ba**; panel cover đặt đúng; nội dung gọn, dễ đọc.
* [ ] Xuất **PDF/JPG** 300 dpi (hoặc SVG vector); sẵn sàng giao nhà in.
* [ ] Giọng văn trang trọng, truyền cảm hứng; tránh chi tiết chưa xác thực.

---

**Thông điệp:** Tờ gấp là lời mời gọi **tri ân – đoàn kết – khát vọng tương lai**, để mỗi công dân thêm hiểu và tự hào trong ngày 2/9. 🇻🇳
