# Website Kỷ niệm 80 năm Quốc khánh Việt Nam

Website tĩnh tổng hợp thông tin về hoạt động kỷ niệm **80 năm Quốc khánh 2/9/2025** của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.

## 🎯 Mục tiêu

- Tổng hợp thông tin từ các nguồn chính thống: Đảng Cộng sản Việt Nam, Báo Chính phủ, VTV
- Giao diện responsive, thân thiện với desktop và mobile
- Nội dung trang trọng, truyền cảm hứng về đại đoàn kết dân tộc
- Triển khai trên Vercel (serverless)

## 🚀 Tính năng

### ✨ Nội dung
- **Trang chủ**: Khẩu hiệu, tinh thần, thông điệp chung
- **Tổng quan**: Hoạt động kỷ niệm trên toàn quốc
- **Hoạt động tiêu biểu**: Nghệ thuật, tri ân, an sinh, triển lãm, thi đua, địa phương
- **Thư viện ảnh**: Chỉ từ 3 nguồn được phép
- **Tài liệu/Credit**: Nguồn thông tin và tác giả

### 🎨 Giao diện
- **Responsive Design**: Desktop (≥1200px), Tablet (768-1024px), Mobile (360-480px)
- **Dark/Light Theme**: Toggle chế độ sáng/tối
- **Tìm kiếm**: Filter nội dung theo từ khóa
- **Gallery**: Lazy loading, phân trang, filter theo nguồn
- **Accessibility**: Keyboard navigation, ARIA labels, contrast AA

### 🔧 Kỹ thuật
- **Static Website**: HTML/CSS/JavaScript thuần
- **Performance**: Preload resources, lazy loading images
- **SEO**: Meta tags, structured data
- **PWA Ready**: Service worker support

## 📁 Cấu trúc dự án

```
website_80nam/
├── index.html              # Trang chủ
├── src/
│   ├── styles.css          # CSS chính
│   └── app.js              # JavaScript chính
├── data/
│   └── content.json        # Nội dung website
├── public/
│   ├── assets/
│   │   └── images.json     # Dữ liệu ảnh
│   └── voice/
│       └── intro.mp3       # Audio giới thiệu (TTS)
├── sources/                # Nguồn dữ liệu
├── crawler.py              # Crawler ảnh
├── gen_content.py          # Sinh nội dung
├── tts_intro.py            # TTS cho hero
├── vercel.json             # Cấu hình Vercel
├── package.json            # NPM scripts
└── README.md               # Tài liệu
```

## 🛠️ Cài đặt và chạy

### 1. Chuẩn bị môi trường

```bash
# Tạo virtual environment
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate

# Cài đặt dependencies
pip install requests beautifulsoup4
```

### 2. Crawl dữ liệu

```bash
# Crawl ảnh từ 3 nguồn được phép
python crawler.py

# Sinh nội dung website
python gen_content.py

# Tạo TTS (tùy chọn)
python tts_intro.py
```

### 3. Chạy local

```bash
# Sử dụng Python HTTP server
python3 -m http.server 5173

# Hoặc sử dụng npm
npm start

# Mở http://localhost:5173
```

## 🚀 Triển khai Vercel

### 1. Cài đặt Vercel CLI

```bash
npm install -g vercel
```

### 2. Cấu hình environment

```bash
# Tạo file .env với VERCEL_TOKEN
echo "VERCEL_TOKEN=your_vercel_token_here" > .env
```

### 3. Deploy

```bash
# Deploy production
vercel --token $VERCEL_TOKEN --confirm --prod

# Hoặc sử dụng npm script
npm run deploy
```

## 📊 Checklist nghiệm thu

### ✅ Nội dung
- [x] Ảnh chỉ từ 3 nguồn: dangcongsan.vn, baochinhphu.vn, vtv.vn
- [x] Credit domain/URL + ngày truy cập
- [x] Nội dung trang trọng, súc tích
- [x] Có slogan & footer note
- [x] Tránh chi tiết chưa xác thực

### ✅ Giao diện
- [x] Responsive (desktop ≥1200px; tablet 768-1024px; mobile 360-480px)
- [x] Dark/Light theme toggle
- [x] Tìm kiếm nhanh
- [x] Gallery lazy loading
- [x] Mobile navigation

### ✅ Accessibility
- [x] Keyboard navigable
- [x] Alt text cho ảnh
- [x] Contrast ≥ AA
- [x] ARIA labels
- [x] Focus management

### ✅ Performance
- [x] Preload critical resources
- [x] Lazy load gallery
- [x] Không tải thư viện nặng
- [x] Optimized images

### ✅ Deploy
- [x] Vercel configuration
- [x] Static hosting
- [x] HTTPS enabled
- [x] Custom domain ready

## 🎨 Design System

### Color Palette
- **Primary Red**: #da251d (Cờ đỏ sao vàng)
- **Primary Yellow**: #ffcd00 (Sao vàng)
- **Light Gray**: #f5f5f5 (Trang trọng)
- **Dark Gray**: #333333 (Text)

### Typography
- **Font**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Sizes**: 16px base, 18px large, 24px xl, 32px 2xl, 48px 3xl

### Components
- **Cards**: 16px radius, subtle shadow
- **Buttons**: Primary (red gradient), Secondary (gray)
- **Forms**: 8px radius, focus states
- **Navigation**: Sticky header, mobile menu

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large Desktop */ }
```

## 🔍 SEO & Performance

### Meta Tags
```html
<meta name="description" content="Website kỷ niệm 80 năm Quốc khánh...">
<meta name="keywords" content="80 năm Quốc khánh, 2/9/2025, Việt Nam...">
<meta name="author" content="Website Kỷ niệm 80 năm Quốc khánh">
```

### Performance
- **Preload**: Critical CSS, JS, JSON data
- **Lazy Loading**: Gallery images
- **Caching**: Static assets with long TTL
- **Compression**: Gzip/Brotli enabled

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 📞 Liên hệ

- **Website**: [website-80nam.vercel.app](https://website-80nam.vercel.app)
- **Email**: contact@website-80nam.vn
- **GitHub**: [github.com/your-username/website-80nam](https://github.com/your-username/website-80nam)

---

**🇻🇳 Độc lập - Tự do - Hạnh phúc: Khát vọng Việt Nam vươn tới tương lai**
