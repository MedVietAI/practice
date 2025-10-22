# Kế hoạch Sự kiện Kỷ niệm 80 năm Quốc khánh 2/9

Hệ thống tự động tạo kế hoạch sự kiện kỷ niệm 80 năm Quốc khánh 2/9 theo khung A90 (T-60 → T+30).

## 🎯 Mục tiêu

Tạo bộ slide PowerPoint chuyên nghiệp, logic, dễ trình bày/duyệt cho sự kiện kỷ niệm 80 năm Quốc khánh 2/9.

## 📁 Cấu trúc dự án

```
event_plan/
├── .env                      # API_KEY=...
├── sources/links.txt         # ảnh hợp lệ (3 domain)
├── public/assets/images.json
├── out/content.json          # nội dung sinh bởi Gemini
├── dist/plan_80nam_A90.pptx
├── crawler.py
├── gen_plan_content.py
├── make_plan_pptx.py
├── config.py
└── requirements.txt
```

## 🚀 Cài đặt & Sử dụng

### 1. Cài đặt môi trường

```bash
# Tạo virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# hoặc .venv\Scripts\activate  # Windows

# Cài đặt dependencies
pip install -r requirements.txt

# Cấu hình API key
echo "API_KEY=sk-your-key-here" > .env
```

### 2. Crawl ảnh từ 3 domain

```bash
python crawler.py
```

### 3. Sinh nội dung kế hoạch

```bash
python gen_plan_content.py
```

### 4. Tạo PowerPoint

```bash
python make_plan_pptx.py
```

## 📊 Nội dung kế hoạch

Kế hoạch bao gồm:

- **Mục tiêu & Phạm vi**: Định hướng rõ ràng cho sự kiện
- **Các bên liên quan**: Stakeholders chính
- **Dòng thời gian A90**: 4 giai đoạn từ T-60 đến T+30
- **Chương trình trọng điểm**: Các hoạt động chính
- **Kế hoạch truyền thông**: Chiến lược truyền thông
- **Hậu cần**: Logistics và vận hành
- **Ngân sách**: Dự trù chi phí
- **Quản lý rủi ro**: Đánh giá và ứng phó rủi ro
- **An toàn & Bền vững**: Đảm bảo an toàn và môi trường
- **Ma trận RACI**: Phân công trách nhiệm
- **KPI**: Chỉ số đo lường hiệu quả
- **Cổng phê duyệt**: Quy trình phê duyệt

## 🎨 Thiết kế

- **Tỷ lệ**: 16:9 (13.33" x 7.5")
- **Màu sắc**: Đỏ vàng (cờ Việt Nam)
- **Font**: Tối thiểu 20pt, tương phản tốt
- **Layout**: Chuyên nghiệp, dễ đọc

## ✅ Checklist nghiệm thu

- [ ] Slide logic, đầy đủ tất cả nội dung
- [ ] Giọng văn trang trọng, tránh dữ kiện chưa xác thực
- [ ] Bố cục 16:9, chữ ≥ 20pt, màu tương phản tốt
- [ ] File PPTX mở tốt trên PowerPoint/Google Slides
- [ ] Nội dung phù hợp với tinh thần yêu nước và đoàn kết dân tộc

## 🔧 Cấu hình

Chỉnh sửa `config.py` để thay đổi:
- API endpoints
- Đường dẫn dự án
- Cấu hình sự kiện
- Domains cho crawling

## 📝 Ghi chú

- Sử dụng AI Gemini để sinh nội dung tự động
- Hỗ trợ 3 domain chính thức: dangcongsan.vn, vtv.vn, nhandan.vn
- Tạo file PowerPoint chuyên nghiệp với python-pptx
- Tất cả quá trình được tự động hóa hoàn toàn
