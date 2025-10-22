**Sản phẩm:** File **PPTX** kế hoạch tổng thể cho sự kiện **Kỷ niệm 80 năm Quốc khánh 2/9 (A90)**.
**Mục tiêu:** Một bộ slide chuyên nghiệp, logic, dễ trình bày/duyệt. Tất cả tạo **tự động** trong Cursor bằng Python, có thể chèn ảnh hợp lệ (3 nguồn).

> **Ghi chú “A90”**: hiểu là **kế hoạch 90 ngày** (T‑60 → T+30) xoay quanh ngày 2/9/2025 (đã qua), dùng như **mẫu chuẩn** cho các đợt tổ chức tương tự. Có thể nhập ngày **mốc** khác qua biến cấu hình.

---

## 0) Cấu trúc dự án

```
event_plan/
 ├─ .env                      # API_KEY=...
 ├─ sources/links.txt         # ảnh hợp lệ (3 domain)
 ├─ public/assets/images.json
 ├─ out/content.json          # nội dung sinh bởi Gemini
 ├─ dist/plan_80nam_A90.pptx
 ├─ crawler.py
 ├─ gen_plan_content.py
 └─ make_plan_pptx.py
```

## 1) Cài đặt & chuẩn bị

```bash
python -m venv event_plan/.venv
source event_plan/.venv/bin/activate
pip install requests beautifulsoup4 python-pptx pillow
printf "API_KEY=sk-xxxx\n" > event_plan/.env
```

## 2) Crawler ảnh (3 domain)

Dùng `crawler.py` như các đề trước, lưu `public/assets/images.json`.

```bash
cd event_plan
python crawler.py
```

## 3) Sinh **nội dung kế hoạch** (Gemini → JSON)

Tạo `gen_plan_content.py`:

```python
from openai import OpenAI
import os, json, re
client = OpenAI(api_key=os.getenv("API_KEY"), base_url="https://api.thucchien.ai")
PROMPT={"role":"user","content":(
    "Soạn dàn ý kế hoạch sự kiện kỷ niệm 80 năm Quốc khánh 2/9 theo khung A90 (T-60→T+30).\n"
    "Trả JSON: {title, objectives:[...], scope:[...], stakeholders:[...], timeline:[{phase,window,workstreams:[...]}],\n"
    "program:[{name,goal,owner,resources,venue?}], communications:[{channel,message,key_dates}],\n"
    "logistics:[{item,details,deadline}], budget:[{category,planned,notes}], risk:[{risk,impact,likelihood,owner,mitigation}],\n"
    "safety:[{topic,actions}], sustainability:[{topic,actions}], raci:[{task,R,A,C,I}], kpi:[{metric,definition,target}], approvals:[{gate,criteria,owner}]}.\n"
    "Giữ giọng trang trọng; tránh chi tiết chưa xác thực; ưu tiên thông điệp chung."
)}
resp = client.chat.completions.create(model='gemini-2.5-pro', messages=[PROMPT])
text = resp.choices[0].message.content
os.makedirs('out', exist_ok=True)
with open('out/_raw.txt','w',encoding='utf-8') as f: f.write(text)
import re, json
m=re.search(r"\{[\s\S]*\}", text)
if not m: raise SystemExit('Không thấy JSON')
obj=json.loads(m.group(0))
with open('out/content.json','w',encoding='utf-8') as f: json.dump(obj,f,ensure_ascii=False,indent=2)
print('✅ out/content.json sẵn sàng')
```

Chạy:

```bash
python gen_plan_content.py
```

## 4) Tạo **PPTX** tự động (python‑pptx)

Tạo `make_plan_pptx.py`:

```python
import os, json, random
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_AUTO_SHAPE_TYPE
from PIL import Image

W,H = Inches(13.33), Inches(7.5)  # 16:9

with open('out/content.json','r',encoding='utf-8') as f: data=json.load(f)

prs = Presentation()
slide_w = prs.slide_width; slide_h = prs.slide_height

THEME_BG = RGBColor(230,0,0)
ACCENT = RGBColor(255,210,0)
TEXT = RGBColor(20,20,20)

# Helpers

def add_title_slide(title, subtitle=""):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    bg = s.shapes.add_shape(MSO_AUTO_SHAPE_TYPE.RECTANGLE, 0,0, slide_w, slide_h)
    bg.fill.solid(); bg.fill.fore_color.rgb = THEME_BG
    bg.line.fill.background()
    tb = s.shapes.add_textbox(Inches(0.8), Inches(2.2), Inches(11.8), Inches(2.5))
    p = tb.text_frame.paragraphs[0]
    p.text = title; p.font.size = Pt(48); p.font.bold=True; p.font.color.rgb = RGBColor(255,255,255)
    if subtitle:
        p2 = tb.text_frame.add_paragraph(); p2.text = subtitle; p2.font.size = Pt(24); p2.font.color.rgb=RGBColor(255,255,255)
    return s

def add_bullets_slide(title, bullets, two_col=False):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    title_box = s.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.8), Inches(1.0))
    p = title_box.text_frame.paragraphs[0]; p.text=title; p.font.size=Pt(36); p.font.bold=True
    if two_col:
        x1,y,w,h = Inches(0.8), Inches(1.4), Inches(5.6), Inches(5.6)
        x2 = Inches(6.6)
        cols=[(x1,y,w,h),(x2,y,w,h)]
        chunks=[bullets[:len(bullets)//2+1], bullets[len(bullets)//2+1:]]
        for (x,y,w,h), bl in zip(cols, chunks):
            tb=s.shapes.add_textbox(x,y,w,h); tf=tb.text_frame; tf.clear()
            for i,b in enumerate(bl):
                p=tf.add_paragraph() if i else tf.paragraphs[0]
                p.text=str(b); p.level=0; p.font.size=Pt(20)
    else:
        tb=s.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.8), Inches(5.8))
        tf=tb.text_frame; tf.clear()
        for i,b in enumerate(bullets):
            p=tf.add_paragraph() if i else tf.paragraphs[0]
            p.text=str(b); p.level=0; p.font.size=Pt(22)
    return s

# 1) Title
add_title_slide(data.get('title','Kế hoạch kỷ niệm 80 năm Quốc khánh 2/9'), 'Khung A90 — T‑60 → T+30')

# 2) Objectives & Scope
add_bullets_slide('Mục tiêu', data.get('objectives',[]))
add_bullets_slide('Phạm vi', data.get('scope',[]))

# 3) Stakeholders
add_bullets_slide('Các bên liên quan', data.get('stakeholders',[]), two_col=True)

# 4) Timeline (pha)
ph = [f"{t.get('phase','')} — {t.get('window','')}" for t in data.get('timeline',[])]
add_bullets_slide('Dòng thời gian (A90)', ph)

# 5) Chương trình trọng điểm
prog = [f"{p.get('name','')}: {p.get('goal','')} (Owner: {p.get('owner','')})" for p in data.get('program',[])]
add_bullets_slide('Chương trình trọng điểm', prog)

# 6) Truyền thông
coms = [f"{c.get('channel','')}: {c.get('message','')} — mốc: {c.get('key_dates','')}" for c in data.get('communications',[])]
add_bullets_slide('Kế hoạch truyền thông', coms, two_col=True)

# 7) Hậu cần & Ngân sách
logs = [f"{l.get('item','')}: {l.get('details','')} — hạn: {l.get('deadline','')}" for l in data.get('logistics',[])]
add_bullets_slide('Hậu cần', logs)

bud = [f"{b.get('category','')}: dự trù {b.get('planned','')} ({b.get('notes','')})" for b in data.get('budget',[])]
add_bullets_slide('Ngân sách (dự trù)', bud)

# 8) Rủi ro, An toàn, Bền vững
risk = [f"{r.get('risk','')} — tác động {r.get('impact','')} — xác suất {r.get('likelihood','')} — Ứng phó: {r.get('mitigation','')}" for r in data.get('risk',[])]
add_bullets_slide('Rủi ro chính & Ứng phó', risk)

safe = [f"{s.get('topic','')}: {s.get('actions','')}" for s in data.get('safety',[])]
add_bullets_slide('An toàn', safe)

sus = [f"{s.get('topic','')}: {s.get('actions','')}" for s in data.get('sustainability',[])]
add_bullets_slide('Bền vững', sus)

# 9) RACI & KPI & Phê duyệt
raci = [f"{r.get('task','')}: R={r.get('R','')}, A={r.get('A','')}, C={r.get('C','')}, I={r.get('I','')}" for r in data.get('raci',[])]
add_bullets_slide('Ma trận RACI', raci)

kpi = [f"{k.get('metric','')}: {k.get('definition','')} — mục tiêu: {k.get('target','')}" for k in data.get('kpi',[])]
add_bullets_slide('Chỉ số đo lường (KPI)', kpi)

appr = [f"Cổng {a.get('gate','')}: {a.get('criteria','')} — Owner: {a.get('owner','')}" for a in data.get('approvals',[])]
add_bullets_slide('Cổng phê duyệt', appr)

# 10) Slide kết
add_title_slide('Tri ân — Đoàn kết — Khát vọng', 'Hướng tới tương lai phồn vinh, hạnh phúc')

os.makedirs('dist', exist_ok=True)
prs.save('dist/plan_80nam_A90.pptx')
print('✅ Xuất dist/plan_80nam_A90.pptx')
```

Chạy:

```bash
python make_plan_pptx.py
```

## 5) Mẹo hoàn thiện & chèn ảnh hợp lệ

* Dùng 1–2 ảnh tiêu biểu làm **background mờ** cho vài slide: mở `python-pptx` → thêm `s.shapes.add_picture(...)` (đặt độ mờ bằng cách đặt ảnh dưới khối semi‑transparent).
* Ghi **credit ảnh** (domain + ngày truy cập) trong slide cuối.

## 6) Checklist nghiệm thu

* [ ] Slide logic, đầy đủ: mục tiêu, dòng thời gian A90, chương trình, truyền thông, hậu cần, ngân sách, rủi ro, an toàn, bền vững, RACI, KPI, phê duyệt.
* [ ] Giọng văn trang trọng, tránh dữ kiện chưa xác thực.
* [ ] Bố cục 16:9; chữ ≥ 20pt; màu tương phản tốt.
* [ ] File **PPTX** mở tốt trên PowerPoint/Google Slides.
