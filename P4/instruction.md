**Sản phẩm:** Website tĩnh (serverless) tổng hợp thông tin về hoạt động kỷ niệm **80 năm Quốc khánh 2/9/2025**.
**Yêu cầu:** Nội dung tin cậy, bố cục logic, thẩm mỹ, thân thiện desktop & mobile (responsive). Chỉ khai thác **ảnh tĩnh** từ 3 nguồn hợp lệ: **dangcongsan.vn**, **baochinhphu.vn**, **vtv.vn**. Không dùng video.
**Triển khai:** **Vercel** (non‑interactive bằng `VERCEL_TOKEN` để thao tác ngay trong Cursor).

---

## 0) Mục tiêu & nguyên tắc nội dung

* Trang chủ: khẩu hiệu – tinh thần – thông điệp chung.
* Các mục: Tổng quan, Hoạt động tiêu biểu (nghệ thuật, tri ân, an sinh, triển lãm, thi đua, địa phương), Thư viện ảnh (chỉ 3 nguồn), Tài liệu/credit.
* Giọng điệu **trang trọng, truyền cảm hứng**, tránh chi tiết chưa xác thực; đề cao **đại đoàn kết** và **khát vọng phát triển**.

## 1) Khởi tạo dự án & môi trường

```bash
mkdir -p website_80nam/{sources,public/assets,public/voice,src,data,dist}
printf "API_KEY=sk-xxxx\nVERCEL_TOKEN=vercel_XXXX\n" > website_80nam/.env
python -m venv website_80nam/.venv
source website_80nam/.venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install requests beautifulsoup4
cd website_80nam
```

## 2) Crawler ảnh (whitelist 3 domain)

Tạo `crawler.py` (giống đề trước, lưu `public/assets/images.json`).
**Lệnh chạy:**

```bash
python crawler.py
```

## 3) Sinh nội dung trang (Gemini Text → JSON)

Tạo `gen_content.py` gọi `gemini-2.5-pro`, yêu cầu trả JSON cấu trúc:

```json
{
  "hero": {"title":"","subtitle":"","lede":""},
  "sections": [
    {"id":"tong_quan","heading":"","paragraphs":["..."]},
    {"id":"nghe_thuat","heading":"","bullets":["..."]},
    {"id":"trien_lam","heading":"","bullets":["..."]},
    {"id":"tri_an","heading":"","bullets":["..."]},
    {"id":"an_sinh","heading":"","bullets":["..."]},
    {"id":"thi_dua","heading":"","bullets":["..."]},
    {"id":"dia_phuong","heading":"","bullets":["..."]}
  ],
  "slogan":"",
  "footer_note":""
}
```

**Lệnh chạy:**

```bash
python gen_content.py  # tạo data/content.json
```

## 4) Tạo website tĩnh (HTML/CSS/JS)

Tạo các file:

```
website_80nam/
 ├─ index.html
 ├─ src/styles.css
 └─ src/app.js
```

### 4.1 `index.html`

* Meta SEO cơ bản; viewport; preload `data/content.json` & `public/assets/images.json`.
* Header (logo chữ, nav), Hero (title, subtitle, lede), Mục nội dung (sections), Gallery ảnh (lazy‑load), About/Credit, Footer.
* Nút **Dark/Light** toggle; tìm kiếm nhanh (filter theo từ khóa trong bullets); anchor nav.

### 4.2 `src/styles.css`

* Layout responsive: grid/fluid, breakpoint 768px/1024px.
* Palette: đỏ – vàng – xám nhạt (trang trọng), focus states, contrast AA.
* Card ảnh: radius 16px, shadow nhẹ, caption + credit link domain.

### 4.3 `src/app.js`

* Fetch `data/content.json` + `public/assets/images.json`.
* Render Hero + Sections: tiêu đề, đoạn/bullets.
* Gallery: phân trang/lazy‑load, filter theo domain (3 nguồn) và theo danh mục.
* Search box: filter nội dung client‑side.
* Toggle theme; nhớ vào `localStorage`.
* A11y: focus trap cho menu mobile, aria‑labels, alt text theo metadata.

## 5) (Tuỳ chọn) TTS phần Lede để tăng tính nhập vai

Tạo `tts_intro.py` để sinh `public/voice/intro.mp3` từ hero.lede.
**HTML:** thẻ `<audio controls src="public/voice/intro.mp3">` ở Hero.

## 6) Xây dựng & xem thử cục bộ

Không cần build; là site tĩnh. Xem bằng **Live Server** của Cursor (hoặc `python -m http.server`).

```bash
python -m http.server 5173
# Mở http://localhost:5173
```

## 7) Cấu hình deploy Vercel (non‑interactive)

### 7.1 Tạo `vercel.json` (Static Project)

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

### 7.2 Chuẩn bị `package.json` (chủ yếu để dùng script preview)

```json
{
  "name": "website-80nam",
  "private": true,
  "scripts": {
    "start": "python -m http.server 5173"
  }
}
```

### 7.3 Cài Vercel CLI và deploy qua token

```bash
npm i -g vercel
# Export token môi trường (đã ghi trong .env)
export $(cat .env | xargs)
vercel --token $VERCEL_TOKEN --confirm --prod
# Hoặc chỉ định thư mục hiện tại
vercel deploy --token $VERCEL_TOKEN --prod --yes
```

> Nếu tổ chức yêu cầu, có thể dùng GitHub + Vercel tự động. Tuy nhiên ở đây đã hỗ trợ triển khai **không tương tác** bằng `VERCEL_TOKEN` ngay trong Cursor.

## 8) Checklist nghiệm thu

* [ ] Ảnh chỉ từ **3 nguồn**; có credit domain/URL + ngày truy cập.
* [ ] Nội dung trang trọng, súc tích, có **slogan** & **footer note**; tránh chi tiết chưa xác thực.
* [ ] Giao diện **responsive** (desktop ≥1200px; tablet ~768–1024px; mobile ~360–480px).
* [ ] A11y cơ bản: keyboard navigable, alt text, contrast ≥ AA.
* [ ] Hiệu năng: preload dữ liệu, lazy‑load gallery, không tải thư viện nặng.
* [ ] Deploy thành công trên **Vercel** (lưu lại URL).

---

## Phụ lục — Mẫu mã nguồn (rút gọn)

> **Ghi chú:** Toàn văn code đã được cung cấp trong phần snippet dưới đây để dán vào Cursor: `crawler.py`, `gen_content.py`, `index.html`, `src/styles.css`, `src/app.js`, `tts_intro.py` (tuỳ chọn), `vercel.json`, `package.json`.
> Quy trình: 1) Crawler ảnh → 2) Sinh `data/content.json` → 3) Mở `index.html` kiểm tra → 4) `vercel --prod` deploy.

### Gợi ý nội dung chủ đạo

* **Khát vọng Việt Nam**: Độc lập – Tự do – Hạnh phúc.
* **Đại đoàn kết**: sức mạnh gắn kết toàn dân tộc.
* **Tri ân – kế thừa – đổi mới**: nối dài hành trình phát triển, nhân ái, sáng tạo.
* **Hướng tới tương lai**: công dân số, văn hóa học tập suốt đời, phát triển bền vững.
