**Sản phẩm:** Infographic một trang (2m x 1m) tóm tắt/hướng dẫn về hoạt động chào mừng **80 năm Quốc khánh 2/9/2025** trên cả nước.
**Xuất bản:** PNG/JPG 7874×3937 px (100 dpi tối thiểu; khuyến nghị 150–200 dpi nếu máy đủ).
**Tuân thủ:** Ảnh **chỉ** từ 3 nguồn: **dangcongsan.vn**, **baochinhphu.vn**, **vtv.vn**. **Không** dùng video. **Serverless**. Chỉ dùng các API được cung cấp (Text, Image Gen *tuỳ chọn cho icon*, TTS *nếu cần mô tả audio riêng*, nhưng sản phẩm chính là ảnh tĩnh để in).

---

## 0) Mục tiêu nội dung & thông điệp

* Tóm tắt **các hoạt động tiêu biểu**: lễ thượng cờ/diễu hành, chương trình nghệ thuật – ánh sáng, phong trào thi đua – sáng kiến, hoạt động tri ân – đền ơn đáp nghĩa, triển lãm – giáo dục truyền thống, an sinh xã hội – thiện nguyện, hoạt động tại các địa phương.
* Tông giọng **trang trọng, tự hào**, khơi gợi **đại đoàn kết**, trách nhiệm công dân, khát vọng phát triển. Tránh nêu số liệu/địa danh chưa chắc chắn.

## 1) Cấu trúc thư mục & chuẩn bị

```bash
mkdir -p project_infographic/{sources,public/assets,dist,out}
printf "API_KEY=sk-xxxx\n" > project_infographic/.env
python -m venv project_infographic/.venv
source project_infographic/.venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install requests beautifulsoup4 pillow
```

Tạo file: `project_infographic/sources/links.txt` → dán **chỉ** các URL từ 3 nguồn hợp lệ liên quan hoạt động kỷ niệm 2/9/2025.

## 2) Crawler ảnh (chỉ 3 nguồn hợp lệ)

Tạo `project_infographic/crawler.py` (dùng lại logic whitelist, lưu `public/assets/images.json`). **Lệnh chạy:**

```bash
cd project_infographic
python crawler.py
```

> Đảm bảo có ít nhất **12–18 ảnh** đa dạng hoạt động để dàn layout.

## 3) Sinh nội dung tóm tắt (Gemini Text → JSON)

Tạo `project_infographic/gen_points.py` (gọi `gemini-2.5-pro`), yêu cầu trả JSON theo khung:

```json
{
  "title": "",
  "subtitle": "",
  "sections": [
    {"id":"mo_dau","heading":"","bullets":["...","..."]},
    {"id":"nghe_thuat","heading":"","bullets":["..."]},
    {"id":"trien_lam","heading":"","bullets":["..."]},
    {"id":"tri_an","heading":"","bullets":["..."]},
    {"id":"an_sinh","heading":"","bullets":["..."]},
    {"id":"thi_dua","heading":"","bullets":["..."]},
    {"id":"dia_phuong","heading":"","bullets":["..."]},
    {"id":"ket","heading":"","bullets":["..."]}
  ],
  "slogan": ""
}
```

**Lệnh chạy:**

```bash
python gen_points.py  # tạo out/points.json
```

> Prompt nhấn mạnh tông trang trọng, tránh chi tiết chưa xác thực, ưu tiên thông điệp giá trị – đoàn kết – khát vọng.

## 4) Thiết kế bố cục (lưới in 2m×1m)

**Kỹ thuật:** canvas 7874×3937 px (100dpi). Lề an toàn tối thiểu **60 mm** (≈236 px) quanh mép; vùng an toàn nội dung cách mép **≥ 100 mm** (≈394 px).
**Khu vực:**

* **Header** (toàn chiều ngang): Quốc kỳ cách điệu (hình học), tiêu đề, subtitle.
* **Body**: 2–3 cột linh hoạt; mỗi section có **heading** + 3–5 bullet; chèn ảnh minh họa (1–2 ảnh/section) từ nguồn hợp lệ.
* **Timeline ngang** (tuỳ chọn) ở đáy body.
* **Footer**: slogan + credit nguồn ảnh + ngày truy cập.

## 5) Render infographic bằng Python (Pillow)

Tạo `project_infographic/render_infographic.py` (đặt màu nền, khối, chữ; tự động dàn ẢNH + TEXT theo JSON; vẽ ngôi sao – dải băng bằng vector cơ bản):

* Đầu vào: `out/points.json`, `public/assets/images.json`.
* Đầu ra: `dist/infographic_80nam_7874x3937.png` (và JPG).
  **Lệnh chạy:**

```bash
python render_infographic.py
```

## 6) (Tuỳ chọn) Sinh icon/trang trí nhỏ bằng Imagen‑4

> Chỉ dùng cho **icon trừu tượng/phụ trợ** (không thay thế ảnh nguồn). Lưu vào `public/assets/decors/` và chèn nhẹ để tăng thẩm mỹ.

```bash
curl -X POST "https://api.thucchien.ai/v1/images/generations" \
 -H "Authorization: Bearer $API_KEY" -H "Content-Type: application/json" \
 -d '{
   "model":"imagen-4",
   "prompt":"Minimal patriotic ribbon and star icon set, flat, solid shapes, red-yellow palette",
   "n":1
 }' > decor.json
```

## 7) Kiểm tra chất lượng in

* Kích thước: **7874×3937 px** (2m×1m @100 dpi). Nếu máy đủ: render ở **150 dpi** (11811×5906 px).
* Độ tương phản cao, font sans-serif đậm nét, cỡ chữ tối thiểu ~**40–48 px** cho bullet; heading **100–160 px**.
* Lề an toàn đủ rộng; không đặt chữ sát mép.
* Kiểm tra aliasing khi scale; xuất cả **PNG** và **JPG** (JPG chất lượng 92–95).

## 8) Checklist nghiệm thu

* [ ] Ảnh chỉ từ **3 nguồn hợp lệ**, có credit + ngày truy cập trong footer.
* [ ] Bố cục rõ, đọc được từ xa (≥2m), màu sắc nhất quán, trang trọng.
* [ ] Nội dung trung tính, truyền cảm hứng; tránh nêu số liệu/địa danh chưa xác nhận.
* [ ] File **PNG/JPG** đủ lớn, sẵn sàng in ngoài trời.

---

## Phụ lục — Mẫu mã nguồn (rút gọn)

> **Ghi chú:** Toàn văn code đã được cung cấp trong phần snippet dưới đây để dán vào Cursor: `crawler.py`, `gen_points.py` (gọi API text), `render_infographic.py` (Pillow).
>
> 1. Dán **`crawler.py`** → chạy.
> 2. Dán **`gen_points.py`** → chạy.
> 3. Dán **`render_infographic.py`** → chạy và nhận file in ấn trong `dist/`.

---

## Tinh thần & thông điệp

* Tôn vinh **ý chí độc lập – tự do**, **đại đoàn kết**, tri ân thế hệ đi trước; khơi dậy **khát vọng phát triển** phồn vinh, hạnh phúc.
* Tối giản – trang trọng – dễ đọc từ xa; nhấn mạnh giá trị **giáo dục truyền thống** và **lan tỏa nhân ái** trong dịp 2/9/2025.
