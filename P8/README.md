# Kỷ Niệm 80 Năm Quốc Khánh Việt Nam - Trò Chơi Tương Tác

Một ứng dụng web tương tác được thiết kế để kỷ niệm 80 năm Quốc khánh Việt Nam (2/9/2025), tích hợp AI và cung cấp nhiều chế độ chơi giáo dục.

[Access the game](https://vietnam-80th-anniversary.vercel.app/)  

## 🎯 Tính Năng Chính

### 🎮 Chế Độ Chơi Đa Dạng
- **Câu Hỏi & Trả Lời**: Kiểm tra kiến thức lịch sử Việt Nam
- **Trắc Nghiệm**: Chọn đáp án đúng từ các lựa chọn
- **Hành Trình RPG**: Khám phá lịch sử qua cuộc phiêu lưu tương tác
- **Thi Đấu**: Cạnh tranh với bạn bè trong các thử thách

### 🤖 Tích Hợp AI
- **Text Generation**: Sử dụng Gemini 2.5 Flash/Pro để tạo nội dung động
- **Image Generation**: Sử dụng Imagen-4 để tạo hình ảnh lịch sử
- **Speech Generation**: Chuyển đổi văn bản thành giọng nói

### 📱 Responsive Design
- Hỗ trợ đầy đủ desktop và mobile
- Giao diện thân thiện, dễ sử dụng
- Tối ưu hóa cho trải nghiệm người dùng

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: OpenAI API (Thực Chiến Gateway)

## 🚀 Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Node.js 18+ 
- npm hoặc yarn

### Cài Đặt Dependencies
```bash
npm install
```

### Cấu Hình Environment
Tạo file `.env.local` với nội dung:
```env
API_KEY=your_api_key_here
NEXT_PUBLIC_API_BASE_URL=https://api.thucchien.ai
```

### Chạy Ứng Dụng
```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## 📁 Cấu Trúc Dự Án

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── games/              # Game components
│   │   ├── QuizGame.tsx    # Quiz game mode
│   │   ├── QAGame.tsx      # Q&A game mode
│   │   └── RPGGame.tsx     # RPG game mode
│   ├── Navigation.tsx      # Desktop navigation
│   ├── MobileNavigation.tsx # Mobile navigation
│   ├── ResponsiveLayout.tsx # Responsive layout
│   ├── GameLauncher.tsx    # Game launcher
│   ├── GameModeSelector.tsx # Game mode selector
│   └── HeroSection.tsx     # Hero section
└── lib/                    # Utility libraries
    ├── ai-client.ts        # AI text generation
    ├── image-generator.ts  # AI image generation
    ├── speech-generator.ts # AI speech generation
    └── content.ts          # Historical content
```

## 🎨 Tính Năng UI/UX

### Responsive Design
- **Mobile First**: Tối ưu cho thiết bị di động
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly**: Các nút và tương tác phù hợp với cảm ứng

### Animations
- **Framer Motion**: Smooth transitions và micro-interactions
- **Loading States**: Spinner và skeleton loading
- **Hover Effects**: Interactive feedback

### Accessibility
- **Keyboard Navigation**: Hỗ trợ điều hướng bằng bàn phím
- **Screen Reader**: Semantic HTML và ARIA labels
- **Color Contrast**: Đảm bảo độ tương phản màu sắc

## 🤖 AI Integration

### Text Generation
```typescript
// Sử dụng Gemini để tạo nội dung
const content = await AIClient.generateGameContent('question', 'Lịch sử Việt Nam')
```

### Image Generation
```typescript
// Tạo hình ảnh lịch sử
const images = await ImageGenerator.generateHistoricalScene('Cách mạng Tháng Tám')
```

### Speech Generation
```typescript
// Chuyển văn bản thành giọng nói
const speech = await SpeechGenerator.generateHistoricalNarration('Tuyên ngôn Độc lập', 'Ngày 2/9/1945')
```

## 📚 Nội Dung Lịch Sử

### Chủ Đề Chính
- Tuyên ngôn Độc lập 2/9/1945
- Cách mạng Tháng Tám 1945
- Kháng chiến chống Pháp (1945-1954)
- Xây dựng đất nước sau độc lập

### Nguồn Tin Chính Thống
- Đảng Cộng sản Việt Nam (dangcongsan.vn)
- Báo Chính phủ (baochinhphu.vn)
- VTV (vtv.vn)

## 🎯 Mục Tiêu Giáo Dục

### Kiến Thức Lịch Sử
- Hiểu biết về lịch sử dân tộc
- Tôn trọng và tự hào về truyền thống
- Phát triển tư duy phản biện

### Kỹ Năng Số
- Sử dụng công nghệ AI
- Tương tác với giao diện hiện đại
- Học tập thông qua trò chơi

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Performance

### Optimization
- **Code Splitting**: Lazy loading components
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Static generation và ISR

### Metrics
- **Lighthouse Score**: 90+ trên tất cả metrics
- **Core Web Vitals**: Tối ưu LCP, FID, CLS
- **Mobile Performance**: Responsive và fast loading

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- **Project Link**: [https://github.com/your-username/vietnam-80th-anniversary](https://github.com/your-username/vietnam-80th-anniversary)
- **Email**: your-email@example.com

## 🙏 Acknowledgments

- Next.js team cho framework tuyệt vời
- Tailwind CSS cho utility-first CSS
- Framer Motion cho animations mượt mà
- Lucide cho icon set đẹp
- AI Thực Chiến cho AI integration
- Cộng đồng open source Việt Nam

---

**Chúc mừng 80 năm Quốc khánh Việt Nam! 🇻🇳**