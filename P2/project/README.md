# 📚 Truyện Tranh Kỷ Niệm 80 Năm Quốc Khánh

## 🎯 Tổng Quan Dự Án

**Chủ đề:** Tổng kết, phân tích các hoạt động chào mừng kỷ niệm **80 năm Quốc khánh 2/9/2025** (toàn quốc)

**Sản phẩm:** Truyện tranh (comic) 5-10 trang, kích thước A4, có bìa, xuất bản dạng SVG vector

**Mục tiêu:** Sáng tạo truyện tranh mới, khai thác ảnh hợp lệ làm nền/khung cảnh, chèn thuyết minh-hội thoại mang tính giáo dục-truyền cảm hứng

## ⚠️ Yêu Cầu Tuân Thủ Tuyệt Đối

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

## 🚀 Hướng Dẫn Sử Dụng

### 1. Chuẩn bị môi trường
```bash
# Kích hoạt virtual environment
source .venv/bin/activate

# Cài đặt thêm cairosvg nếu muốn chuyển đổi PNG
pip install cairosvg
```

### 2. Cấu hình API Key
Chỉnh sửa file `.env` và thay thế `sk-xxxxxx` bằng API key thực tế:
```
API_KEY=your_actual_api_key_here
```

### 3. Chuẩn bị danh sách URL
Chỉnh sửa file `sources/links.txt` và thêm các URL thực tế từ 3 nguồn chính thức:
- dangcongsan.vn
- baochinhphu.vn  
- vtv.vn

**Yêu cầu:** Tối thiểu 15-20 URL từ mỗi nguồn (tổng 45-60 URL)

### 4. Chạy quy trình tạo truyện tranh

#### Bước 1: Tải ảnh từ các nguồn
```bash
python crawler.py
```
Kết quả: Ảnh được lưu trong `public/assets/` và metadata trong `public/assets/images.json`

#### Bước 2: Sinh cốt truyện
```bash
python gen_story.py
```
Kết quả: Cốt truyện JSON trong `out/story.json` và toàn bộ nội dung trong `out/story_full.txt`

#### Bước 3: Tạo truyện tranh SVG
```bash
python make_comic.py
```
Kết quả: Các trang truyện tranh SVG trong thư mục `comic/`

#### Bước 4: (Tùy chọn) Chuyển đổi sang PNG
```bash
python convert_to_png.py
```
Kết quả: Các file PNG trong thư mục `comic/`

## 📁 Cấu Trúc Dự Án

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
├─ make_comic.py             # Tool tạo truyện tranh SVG
└─ convert_to_png.py        # Tool chuyển đổi PNG
```

## 🎨 Đặc Điểm Kỹ Thuật

### Định dạng truyện tranh
- **Kích thước:** A4 (210x297mm)
- **Độ phân giải:** 300 DPI
- **Định dạng:** SVG vector (có thể in ấn)
- **Số trang:** 5-10 trang (bao gồm 1 trang bìa)

### Nội dung và thông điệp
- **Ngôn ngữ:** Tiếng Việt, trang trọng
- **Tông màu:** Trang trọng – ấm áp – truyền cảm hứng
- **Thông điệp:** Tự hào dân tộc, trách nhiệm công dân
- **Giá trị:** Độc lập – tự do – đoàn kết – đổi mới

## ✅ Checklist Nghiệm Thu

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

## 🎯 Thông Điệp Trung Tâm

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

## 🔒 Cam Kết Tuân Thủ

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

**🎉 Chúc đội thi hoàn thành tác phẩm truyện tranh đậm chất tự hào, sáng tạo mà trang trọng — lan tỏa tinh thần 2/9! 🇻🇳**
