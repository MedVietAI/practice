# 🇻🇳 Hành Trình 80 Năm Độc Lập - Game Tương Tác

## Tổng Quan

Game tương tác kỷ niệm 80 năm Quốc khánh Việt Nam (2/9/1945 - 2/9/2025), kể về hành trình từ cuộc đấu tranh giành độc lập đến những thành tựu hiện đại.

## Tính Năng Chính

### 🎮 Gameplay
- **5 Chương Lịch Sử**: Từ thời thuộc địa đến Việt Nam hiện đại
- **20 Câu Hỏi Tương Tác**: MCQ và Q&A đa dạng về lịch sử Việt Nam
- **Hệ Thống Điểm Số**: 5 danh hiệu từ "Cần Học Thêm" đến "Anh Hùng Dân Tộc"
- **Thời Gian**: 10 phút chơi với 30 giây cho mỗi câu hỏi

### 🎨 Giao Diện
- **Responsive Design**: Hỗ trợ desktop và mobile
- **Nhân Vật Dẫn Đường**: Anh Minh - người dẫn đường tinh thần
- **Hình Ảnh Thực Tế**: Khai thác từ các nguồn tin chính thống
- **Giọng Nói AI**: Hướng dẫn người chơi qua từng giai đoạn

### 🔧 Công Nghệ
- **Next.js 14**: Framework React hiện đại
- **TypeScript**: Type safety và developer experience
- **Tailwind CSS**: Styling nhanh chóng và responsive
- **AI Integration**: Sử dụng AI Thực Chiến API

## Cấu Trúc Dự Án

```
src/
├── app/
│   ├── api/
│   │   ├── generate-character/    # API tạo nhân vật
│   │   └── load-images/           # API tải hình ảnh
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ChapterSection.tsx         # Component chương game
│   ├── GameCharacter.tsx          # Component nhân vật
│   ├── GameResult.tsx             # Component kết quả
│   ├── QuestionCard.tsx           # Component câu hỏi
│   └── VietnamGame.tsx            # Component game chính
└── lib/
    ├── ai-client.ts               # Client AI Thực Chiến
    ├── game-data.ts               # Dữ liệu game và câu hỏi
    └── image-crawler.ts           # Crawler hình ảnh
```

## Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js 18+ 
- npm hoặc yarn
- API key từ AI Thực Chiến

### Cài Đặt Dependencies
```bash
npm install
# hoặc
yarn install
```

### Cấu Hình Environment
Tạo file `.env.local`:
```env
AI_API_KEY=your_api_key_here
AI_API_BASE=https://api.thucchien.ai/v1
```

### Chạy Development Server
```bash
npm run dev
# hoặc
yarn dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## Cấu Trúc Game

### Chương 1: Bóng Tối Thuộc Địa (2 phút)
- Bối cảnh: Việt Nam dưới ách thống trị của thực dân Pháp
- Câu hỏi: 3 câu về các cuộc khởi nghĩa chống Pháp
- Hình ảnh: Phan Bội Châu, Phan Châu Trinh, các cuộc khởi nghĩa

### Chương 2: Ngọn Lửa Cách Mạng (2.5 phút)
- Bối cảnh: Phong trào cách mạng và sự ra đời của Đảng Cộng sản Việt Nam
- Câu hỏi: 3 câu về hành trình tìm đường cứu nước của Bác Hồ
- Hình ảnh: Hồ Chí Minh, Cách mạng Tháng Tám

### Chương 3: Giây Phút Thiêng Liêng (2 phút)
- Bối cảnh: Ngày 2/9/1945 - Tuyên ngôn Độc lập
- Câu hỏi: 3 câu về Tuyên ngôn Độc lập
- Hình ảnh: Quảng trường Ba Đình, lễ tuyên bố độc lập

### Chương 4: Hành Trình Xây Dựng (2 phút)
- Bối cảnh: Việt Nam từ 1945 đến nay
- Câu hỏi: 3 câu về các cuộc kháng chiến và đổi mới
- Hình ảnh: Điện Biên Phủ, chiến tranh chống Mỹ, đổi mới

### Chương 5: Việt Nam Hiện Đại (1.5 phút)
- Bối cảnh: Việt Nam ngày nay - quốc gia phát triển
- Câu hỏi: 8 câu về thành tựu hiện đại
- Hình ảnh: Công trình kiến trúc, khoa học công nghệ, văn hóa

## Hệ Thống Câu Hỏi

### Phân Loại Câu Hỏi
- **Lịch sử (8-10 câu)**: Các sự kiện lịch sử quan trọng
- **Văn hóa (3-4 câu)**: Quốc ca, thủ đô, biểu tượng quốc gia
- **Thành tựu Hiện đại (4-6 câu)**: ASEAN, vệ tinh, di sản thế giới

### Độ Khó
- **Dễ**: Câu hỏi cơ bản về lịch sử
- **Trung bình**: Câu hỏi chi tiết về sự kiện
- **Khó**: Câu hỏi chuyên sâu về lịch sử

## Danh Hiệu

| Điểm Số | Danh Hiệu | Mô Tả |
|---------|-----------|-------|
| 180-200 | Anh Hùng Dân Tộc | Hiểu biết sâu sắc về lịch sử |
| 150-179 | Chiến Sĩ Cách Mạng | Kiến thức lịch sử vững vàng |
| 120-149 | Công Dân Yêu Nước | Hiểu biết tốt về lịch sử |
| 90-119 | Người Bạn Việt Nam | Hiểu biết cơ bản |
| <90 | Cần Học Thêm | Cần học hỏi thêm |

## API Integration

### AI Thực Chiến API
- **Text Generation**: `gemini-2.5-flash` cho câu hỏi và nội dung
- **Image Generation**: `imagen-4` cho nhân vật và hình ảnh
- **Speech Generation**: `gemini-2.5-flash-preview-tts` cho giọng nói

### Image Sources
- **dangcongsan.vn**: Tin tức Đảng Cộng sản
- **baochinhphu.vn**: Tin tức Chính phủ
- **vtv.vn**: Truyền hình Việt Nam

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- Project Link: [https://github.com/yourusername/vietnam-80th-anniversary](https://github.com/yourusername/vietnam-80th-anniversary)
- AI Thực Chiến: [https://api.thucchien.ai](https://api.thucchien.ai)

## Acknowledgments

- Lịch sử Việt Nam vẻ vang
- Các nguồn tin chính thống Việt Nam
- AI Thực Chiến API
- Next.js và React community