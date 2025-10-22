**Sản phẩm:** Trò chơi **mobile web** tương tác, chủ đề **nâng cao nhận thức về ngày 2/9**.
**Triển khai:** **Vercel** (static, serverless).
**Tuân thủ:** Ảnh **chỉ** từ 3 nguồn: **dangcongsan.vn**, **baochinhphu.vn**, **vtv.vn**. **Không** dùng video. **Chỉ** dùng API đã cấp (Text/TTS/Image Gen phụ trợ icon).

---

## 0) Tinh thần & mục tiêu

* Trò chơi vui – trang trọng – giáo dục: giúp người chơi hiểu **ý nghĩa 2/9**, hoạt động tiêu biểu, giá trị **độc lập – tự do – hạnh phúc**, **đại đoàn kết**, **tri ân**, **khát vọng phát triển**.
* Vận hành mượt trên **mobile** (màn 360–480 px), cũng **responsive** desktop.

## 1) Cấu trúc thư mục

```
webgame_2_9/
 ├─ .env                       # API_KEY, VERCEL_TOKEN
 ├─ sources/links.txt          # URL từ 3 nguồn hợp lệ
 ├─ public/assets/             # ảnh tải về + images.json
 ├─ public/audio/              # (tuỳ chọn) mp3 TTS lời dẫn/mẹo chơi
 ├─ data/content.json          # câu hỏi/nội dung sinh từ Gemini
 ├─ index.html
 ├─ src/styles.css
 ├─ src/app.js
 ├─ src/game_modes.js
 ├─ src/utils.js
 ├─ crawler.py
 ├─ gen_questions.py
 ├─ tts_prompts.py             # (tuỳ chọn) sinh TTS
 ├─ vercel.json
 └─ package.json
```

## 2) Cài đặt & biến môi trường

```bash
python -m venv webgame_2_9/.venv
source webgame_2_9/.venv/bin/activate  # Windows: .venv\Scripts\activate
pip install requests beautifulsoup4
cd webgame_2_9
printf "API_KEY=sk-xxxx\nVERCEL_TOKEN=vercel_xxx\n" > .env
```

## 3) Crawler ảnh (whitelist 3 domain)

Tạo `crawler.py` (tương tự các đề trước) → lưu `public/assets/images.json`.
**Chạy:** `python crawler.py`

## 4) Sinh **ngân hàng câu hỏi** (Gemini → JSON)

Tạo `gen_questions.py`:

```python
from openai import OpenAI
import os, json, re
client = OpenAI(api_key=os.getenv("API_KEY"), base_url="https://api.thucchien.ai")
PROMPT={"role":"user","content":(
  "Tạo bộ câu hỏi trò chơi nhận thức về ngày 2/9 (tiếng Việt).\n"
  "Trả JSON: {intro, modes:[\n"
  " {id:'guess',title:'Đoán hoạt động',rules:'',items:[{question,options:[...],answer_index,intro?}]},\n"
  " {id:'order',title:'Sắp xếp trình tự',rules:'',items:[{prompt,choices:[...],correct_order:[...]}]},\n"
  " {id:'tf',title:'Đúng/Sai',rules:'',items:[{statement,answer:true|false,explain}]}\n"
  "]}.\n"
  "Giọng trang trọng, giáo dục; tránh chi tiết chưa xác thực; ưu tiên thông điệp giá trị."
)}
resp = client.chat.completions.create(model='gemini-2.5-pro', messages=[PROMPT])
text = resp.choices[0].message.content
m=re.search(r"\{[\s\S]*\}", text)
if not m: raise SystemExit('Không thấy JSON')
obj=json.loads(m.group(0))
os.makedirs('data', exist_ok=True)
with open('data/content.json','w',encoding='utf-8') as f: json.dump(obj,f,ensure_ascii=False,indent=2)
print('✅ data/content.json sẵn sàng')
```

**Chạy:** `python gen_questions.py`

## 5) (Tuỳ chọn) TTS lời dẫn/mẹo chơi

Tạo `tts_prompts.py` dùng API TTS để tạo `public/audio/intro.mp3` và `public/audio/hint.mp3` từ `data/content.json['intro']` hay rule mỗi mode.

> Không bắt buộc, nhưng giúp nhập vai hơn.

## 6) Giao diện & gameplay (HTML/CSS/JS)

### 6.1 `index.html`

```html
<!doctype html><html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Game nhận thức 2/9 — 80 năm Quốc khánh</title>
  <link rel="stylesheet" href="src/styles.css"/>
</head>
<body>
  <header class="topbar">
    <h1>2/9 • Nhận thức & Tự hào</h1>
    <button id="themeToggle" aria-label="Đổi giao diện">🌓</button>
  </header>
  <main id="app" class="container">
    <section id="home" class="view active">
      <p id="intro"></p>
      <div class="cards">
        <button class="card" data-mode="guess">🎯 Đoán hoạt động</button>
        <button class="card" data-mode="order">🧩 Sắp xếp trình tự</button>
        <button class="card" data-mode="tf">✅ Đúng/Sai</button>
      </div>
      <div class="credits">Nguồn ảnh: dangcongsan.vn · baochinhphu.vn · vtv.vn</div>
    </section>

    <section id="game" class="view">
      <div class="hud">
        <span id="modeTitle"></span>
        <span>Điểm: <b id="score">0</b></span>
        <span>Best: <b id="best">0</b></span>
      </div>
      <div id="stage"></div>
      <div class="actions">
        <button id="btnBack">← Trang chủ</button>
        <button id="btnNext">Tiếp tục →</button>
      </div>
    </section>
  </main>
  <script src="src/utils.js"></script>
  <script src="src/game_modes.js"></script>
  <script src="src/app.js"></script>
</body></html>
```

### 6.2 `src/styles.css`

* Thiết kế **mobile-first**, grid card lớn, nút bấm to, trạng thái focus/hover rõ, tương phản ≥ AA.
* Màu chủ đạo **đỏ — vàng** trang trọng, nền xám nhạt.
* Gallery ảnh nền game **object-fit: cover**, bo góc 16px.

### 6.3 `src/utils.js`

* Load `data/content.json` & `public/assets/images.json`.
* `pickImage()` chọn ảnh ngẫu nhiên từ 3 nguồn hợp lệ.
* `shuffle()`, `saveBest(score)` lưu localStorage.

### 6.4 `src/game_modes.js`

* **guess:** Hiển thị **ảnh** + 3–4 lựa chọn (buttons). Chọn đúng → +10; sai → 0; giải thích ngắn.
* **order:** Kéo‑thả hoặc bấm sắp xếp các mục theo trình tự đúng; chấm điểm theo mức đúng.
* **tf:** Câu đúng/sai; giải thích sau khi chọn.
* Mỗi câu chạy 20–30 giây **(tuỳ chọn)**, có đồng hồ đếm.

### 6.5 `src/app.js`

* Router nội bộ giữa `#home` ↔ `#game`.
* Khởi tạo theo **mode**; vẽ UI tương ứng; cập nhật điểm; gọi `pickImage()` cho các câu cần ảnh.
* Nút **Tiếp tục** chuyển câu.
* Toggle **Dark/Light** + lưu lựa chọn.

> **Gợi ý UX:** Khi trả lời, overlay một **thẻ giải thích** 2–3 dòng (giọng mời gọi, trung tính). Tránh nêu chi tiết chưa xác thực.

## 7) vercel.json & deploy

`vercel.json` (static):

```json
{
  "version": 2,
  "public": true,
  "cleanUrls": true,
  "trailingSlash": false,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/data/(.*)", "dest": "/data/$1" },
    { "src": "/public/(.*)", "dest": "/public/$1" },
    { "src": "/src/(.*)", "dest": "/src/$1" }
  ]
}
```

`package.json` (tùy chọn script preview):

```json
{ "name":"webgame-2-9", "private":true, "scripts": {"start":"python -m http.server 5173"} }
```

**Triển khai:**

```bash
npm i -g vercel
export $(cat .env | xargs)
vercel --token $VERCEL_TOKEN --confirm --prod
```

## 8) Checklist nghiệm thu

* [ ] Ảnh **chỉ** từ 3 nguồn; có dòng credit trong trang chủ.
* [ ] 3 **chế độ chơi** hoạt động tốt; điểm/best hoạt động; chạy mượt trên **mobile**.
* [ ] Text rõ ràng, trung tính, truyền cảm hứng; tránh chi tiết chưa xác thực.
* [ ] Deploy thành công trên **Vercel**; không cần backend.

---

## Phụ lục — Gợi ý code rút gọn

> Tài liệu đã cung cấp skeleton đầy đủ; chỉ cần dán vào Cursor và chạy theo thứ tự: `crawler.py` → `gen_questions.py` → mở `index.html` → deploy Vercel.
> Nếu cần, thêm `tts_prompts.py` để có giọng đọc giới thiệu.
