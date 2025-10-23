# Hướng dẫn Triển khai Website 80 năm Quốc khánh

## 🚀 Triển khai trên Vercel (Non-interactive)

### 1. Chuẩn bị

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Cấu hình token (đã có trong .env)
export $(cat .env | xargs)
```

### 2. Deploy Production

```bash
# Deploy với token
vercel --token $VERCEL_TOKEN --confirm --prod

# Hoặc chỉ định thư mục
vercel deploy --token $VERCEL_TOKEN --prod --yes
```

### 3. Cấu hình Custom Domain (Tùy chọn)

```bash
# Thêm domain
vercel domains add your-domain.com

# Liên kết với project
vercel link
vercel domains add your-domain.com
```

## 🔧 Cấu hình Vercel

### vercel.json
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

### Headers cho Performance
- **Static Assets**: Cache 1 năm
- **Security Headers**: XSS Protection, Content Type Options
- **CORS**: Cấu hình cho API calls

## 📊 Monitoring & Analytics

### Vercel Analytics
```bash
# Cài đặt Vercel Analytics
npm install @vercel/analytics

# Thêm vào index.html
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS
- **Lighthouse Score**: ≥90
- **PageSpeed Insights**: Mobile/Desktop

## 🔄 CI/CD Pipeline

### GitHub Actions (Tùy chọn)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🌐 CDN & Global Distribution

### Vercel Edge Network
- **Global CDN**: 100+ edge locations
- **Automatic HTTPS**: SSL certificates
- **DDoS Protection**: Built-in security
- **Image Optimization**: Automatic WebP conversion

### Performance Optimization
```javascript
// Service Worker cho offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

## 📱 PWA Configuration

### manifest.json
```json
{
  "name": "Website 80 năm Quốc khánh",
  "short_name": "80nam",
  "description": "Kỷ niệm 80 năm Quốc khánh Việt Nam",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#da251d",
  "theme_color": "#da251d",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🔒 Security & Compliance

### Security Headers
- **X-Content-Type-Options**: nosniff
- **X-Frame-Options**: DENY
- **X-XSS-Protection**: 1; mode=block
- **Strict-Transport-Security**: max-age=31536000

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:;">
```

## 📈 Performance Metrics

### Target Metrics
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <3.5s

### Optimization Checklist
- [x] Image lazy loading
- [x] Critical CSS inlined
- [x] JavaScript minified
- [x] Gzip compression
- [x] Browser caching
- [x] CDN distribution

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check logs
   vercel logs
   
   # Debug locally
   vercel dev
   ```

2. **Environment Variables**
   ```bash
   # Set in Vercel dashboard
   vercel env add VERCEL_TOKEN
   ```

3. **Domain Issues**
   ```bash
   # Check DNS
   nslookup your-domain.com
   
   # Verify SSL
   curl -I https://your-domain.com
   ```

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Status Page**: https://vercel-status.com
- **Community**: https://github.com/vercel/vercel/discussions

---

**Lưu ý**: Đảm bảo VERCEL_TOKEN có quyền deploy và cấu hình project trước khi chạy lệnh deploy.
