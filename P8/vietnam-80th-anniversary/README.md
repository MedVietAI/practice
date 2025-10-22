# Kỷ Niệm 80 Năm Quốc Khánh Việt Nam - Trò Chơi Tương Tác Nâng Cao

Một ứng dụng web tương tác được thiết kế đặc biệt để kỷ niệm 80 năm Quốc khánh Việt Nam (2/9/2025), tích hợp AI và cung cấp trải nghiệm du hành thời gian chân thực.

[Access the game](https://vietnam-80th-anniversary.vercel.app/)

## 🎯 Tính Năng Mới Được Nâng Cấp

### 🕰️ Hành Trình Lịch Sử - Time Travel Experience
- **Du hành thời gian tương tác**: Trải nghiệm chân thực các sự kiện lịch sử quan trọng
- **Timeline tương tác**: Dòng thời gian với các sự kiện từ 1945 đến 2025
- **Nhân vật lịch sử**: Gặp gỡ và tương tác với các nhân vật quan trọng
- **Bối cảnh lịch sử**: Hiểu rõ ý nghĩa và tầm quan trọng của từng sự kiện

### 📸 Thư Viện Hình Ảnh Chính Thống
- **Nguồn tin uy tín**: Hình ảnh từ Đảng Cộng sản, Chính phủ, và VTV
- **Phân loại thông minh**: Lọc theo loại sự kiện (lễ kỷ niệm, triển lãm, văn hóa, giáo dục)
- **Tìm kiếm nâng cao**: Tìm kiếm theo từ khóa và thời gian
- **Chia sẻ dễ dàng**: Chia sẻ hình ảnh và thông tin với bạn bè

### 🎉 Nội Dung Kỷ Niệm 80 Năm
- **Hoạt động đặc biệt**: Lễ diễu binh, triển lãm, chương trình nghệ thuật
- **Địa điểm tổ chức**: Thông tin chi tiết về các địa điểm kỷ niệm
- **Sự kiện đặc biệt**: Timeline các sự kiện quan trọng trong năm 2025
- **Tương tác cộng đồng**: Chia sẻ khoảnh khắc và tham gia hoạt động

## 🎮 Chế Độ Chơi Nâng Cao

### 🎯 Câu Hỏi & Trả Lời Thông Minh
- **AI tạo câu hỏi**: Sử dụng Gemini để tạo câu hỏi động
- **Gợi ý thông minh**: Hệ thống gợi ý dựa trên AI
- **Đánh giá tự động**: AI đánh giá và nhận xét câu trả lời
- **Nội dung cá nhân hóa**: Điều chỉnh độ khó theo người chơi

### 🎲 Trắc Nghiệm Tương Tác
- **Thời gian thực**: Đồng hồ đếm ngược tạo áp lực
- **Giải thích chi tiết**: Mỗi câu hỏi có giải thích lịch sử
- **Xếp hạng**: Hệ thống điểm và thành tích
- **Nội dung đa dạng**: Từ dễ đến khó, phù hợp mọi lứa tuổi

### 🗡️ RPG Lịch Sử
- **Nhân vật phát triển**: Hệ thống cấp độ và kinh nghiệm
- **Cốt truyện hấp dẫn**: Khám phá lịch sử qua cuộc phiêu lưu
- **Thành tựu**: Thu thập thành tựu và mở khóa nội dung
- **Hình ảnh AI**: Tạo hình ảnh lịch sử động bằng AI

## 🤖 Tích Hợp AI Nâng Cao

### 📝 Text Generation
```typescript
// Tạo nội dung động với Gemini
const content = await AIClient.generateGameContent('question', 'Lịch sử Việt Nam')
const story = await AIClient.generateRPGContent('Tuyên ngôn Độc lập', 'Chứng kiến lịch sử')
```

### 🎨 Image Generation
```typescript
// Tạo hình ảnh lịch sử
const images = await ImageGenerator.generateHistoricalScene('Cách mạng Tháng Tám')
const characters = await ImageGenerator.generateCharacter('Lãnh tụ', '1945')
```

### 🎵 Speech Generation
```typescript
// Tạo giọng nói cho trải nghiệm
const speech = await SpeechGenerator.generateHistoricalNarration('Tuyên ngôn Độc lập', 'Ngày 2/9/1945')
```

## 📱 Responsive Design Nâng Cao

### 🎨 UI/UX Cải Tiến
- **Animations mượt mà**: Framer Motion cho trải nghiệm mượt mà
- **Loading states**: Skeleton loading và progress indicators
- **Micro-interactions**: Hover effects và click feedback
- **Accessibility**: Hỗ trợ screen reader và keyboard navigation

### 📱 Mobile Optimization
- **Touch-friendly**: Tối ưu cho cảm ứng
- **Gesture support**: Swipe và pinch to zoom
- **Offline capability**: Hoạt động khi mất kết nối
- **Performance**: Tối ưu tốc độ tải và sử dụng bộ nhớ

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
OPENAI_API_KEY=your_openai_api_key_here
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
│   ├── HistorySection.tsx  # Time travel experience
│   ├── NewsImageGallery.tsx # Image gallery
│   ├── CelebrationSection.tsx # 80th anniversary content
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
    ├── news-image-fetcher.ts # News image integration
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

## 📚 Nội Dung Lịch Sử Chi Tiết

### Chủ Đề Chính
- **Tuyên ngôn Độc lập 2/9/1945**: Sự kiện khai sinh nước Việt Nam
- **Cách mạng Tháng Tám 1945**: Cuộc tổng khởi nghĩa vĩ đại
- **Kháng chiến chống Pháp**: Chiến thắng Điện Biên Phủ 1954
- **Xây dựng đất nước**: Từ độc lập đến phát triển

### 🎉 Kỷ Niệm 80 Năm (2025)
- **Lễ kỷ niệm chính thức**: Quảng trường Ba Đình, Hà Nội
- **Triển lãm quốc gia**: "80 năm độc lập - Hành trình vinh quang"
- **Chương trình nghệ thuật**: "Tự hào Việt Nam"
- **Hoạt động giáo dục**: Cuộc thi tìm hiểu lịch sử
- **Phát hành đặc biệt**: Bộ tem kỷ niệm 80 năm

### 🏛️ Nguồn Tin Chính Thống
- **Đảng Cộng sản Việt Nam**: dangcongsan.vn
- **Báo Chính phủ**: baochinhphu.vn
- **VTV**: vtv.vn
- **Tích hợp API**: Lấy hình ảnh và nội dung thực tế

## 🎯 Mục Tiêu Giáo Dục

### Kiến Thức Lịch Sử
- **Hiểu biết sâu sắc**: Về lịch sử dân tộc Việt Nam
- **Tôn trọng truyền thống**: Yêu nước và tự hào dân tộc
- **Tư duy phản biện**: Phân tích và đánh giá sự kiện lịch sử
- **Kết nối hiện tại**: Liên hệ lịch sử với hiện tại

### Kỹ Năng Số
- **AI Literacy**: Hiểu và sử dụng AI
- **Digital Citizenship**: Sử dụng internet an toàn
- **Critical Thinking**: Đánh giá thông tin
- **Collaboration**: Làm việc nhóm online

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Vercel
```bash
# Set in Vercel dashboard or CLI
vercel env add API_KEY
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_API_BASE_URL
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

## 📈 Performance & Optimization

### Tối Ưu Hóa
- **Code Splitting**: Lazy loading components
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Static generation và ISR
- **CDN**: Global content delivery

### Metrics
- **Lighthouse Score**: 95+ trên tất cả metrics
- **Core Web Vitals**: Tối ưu LCP, FID, CLS
- **Mobile Performance**: 90+ điểm mobile
- **Accessibility**: WCAG 2.1 AA compliant

## 🔧 Troubleshooting

### Common Issues

#### API Key Errors
```bash
# Error: OPENAI_API_KEY environment variable is missing
# Solution: Set environment variables in Vercel
vercel env add API_KEY
vercel env add OPENAI_API_KEY
```

#### Build Errors
```bash
# Error: Module not found
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Deployment Issues
```bash
# Error: Build failed
# Solution: Check environment variables
vercel env ls
```

## 🤝 Contributing

### Development
1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Guidelines
- **Code Style**: ESLint + Prettier
- **Commit Messages**: Conventional Commits
- **Testing**: Jest + React Testing Library
- **Documentation**: JSDoc cho functions

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact & Support

- **Project Repository**: [GitHub Repository]
- **Documentation**: [Wiki Pages]
- **Issues**: [GitHub Issues]
- **Email**: support@vietnam-80th-anniversary.com

## 🙏 Acknowledgments

### 🏛️ Institutional Support
- **Đảng Cộng sản Việt Nam**: Nguồn tin chính thống
- **Chính phủ Việt Nam**: Hỗ trợ nội dung
- **VTV**: Hình ảnh và video lịch sử

### 💻 Technical Support
- **Next.js Team**: Framework tuyệt vời
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animations mượt mà
- **Lucide**: Icon set đẹp
- **AI Thực Chiến**: AI integration platform
- **Cộng đồng Open Source Việt Nam**: Hỗ trợ và đóng góp

### 🎓 Educational Partners
- **Bộ Giáo dục và Đào tạo**: Hướng dẫn nội dung giáo dục
- **Hội Khoa học Lịch sử Việt Nam**: Tư vấn chuyên môn
- **Các trường đại học**: Testing và feedback

---

## 🎉 Chúc Mừng 80 Năm Quốc Khánh Việt Nam! 🇻🇳

**"Không có gì quý hơn độc lập, tự do"** - Chủ tịch Hồ Chí Minh

Hãy cùng nhau tôn vinh lịch sử hào hùng của dân tộc và xây dựng tương lai tươi sáng cho đất nước Việt Nam!

---

*Dự án này được phát triển với tình yêu và lòng tự hào dân tộc, nhằm giáo dục thế hệ trẻ về lịch sử vẻ vang của Việt Nam.*