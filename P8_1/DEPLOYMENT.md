# Vercel Deployment Guide

## 🚀 Quick Deployment

### 1. Prerequisites
- Vercel account
- GitHub repository
- API keys ready

### 2. Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add API_KEY
vercel env add OPENAI_API_KEY
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set environment variables in project settings

### 3. Environment Variables

Set these in Vercel dashboard or CLI:

```bash
# Required for AI functionality
API_KEY=your_thucchien_api_key
OPENAI_API_KEY=your_openai_api_key

# Optional: Custom API base URL
NEXT_PUBLIC_API_BASE_URL=https://api.thucchien.ai
```

### 4. Build Configuration

The project includes `vercel.json` with optimal settings:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "API_KEY": "@api_key",
    "OPENAI_API_KEY": "@openai_api_key",
    "NEXT_PUBLIC_API_BASE_URL": "https://api.thucchien.ai"
  }
}
```

## 🔧 Troubleshooting

### Common Issues

#### 1. API Key Errors
```
Error: The OPENAI_API_KEY environment variable is missing
```

**Solution:**
```bash
# Set environment variables in Vercel
vercel env add API_KEY
vercel env add OPENAI_API_KEY

# Redeploy
vercel --prod
```

#### 2. Build Failures
```
Error: Build failed
```

**Solution:**
```bash
# Check build locally first
npm run build

# If successful, redeploy
vercel --prod
```

#### 3. Runtime Errors
```
Error: Minified React error #423
```

**Solution:**
- Check environment variables are set correctly
- Ensure all dependencies are installed
- Check for TypeScript errors

### Debug Steps

1. **Check Environment Variables:**
```bash
vercel env ls
```

2. **Test Build Locally:**
```bash
npm run build
npm start
```

3. **Check Vercel Logs:**
```bash
vercel logs [deployment-url]
```

## 📊 Performance Optimization

### Vercel Settings
- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Recommended Settings
- **Node.js Version**: 18.x
- **Build Cache**: Enabled
- **Edge Functions**: For API routes
- **Image Optimization**: Next.js Image component

## 🔒 Security

### Environment Variables
- Never commit API keys to repository
- Use Vercel's environment variable system
- Rotate keys regularly

### Headers
The project includes security headers in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 📈 Monitoring

### Vercel Analytics
- Enable Vercel Analytics for performance monitoring
- Set up alerts for errors
- Monitor Core Web Vitals

### Custom Domain
```bash
# Add custom domain
vercel domains add your-domain.com
```

## 🚀 Advanced Deployment

### Preview Deployments
```bash
# Deploy preview
vercel

# Deploy to production
vercel --prod
```

### Branch Deployments
- Automatic deployments for main branch
- Preview deployments for feature branches
- Custom domains for staging

### CI/CD Integration
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

### Project Support
- Check GitHub Issues
- Review deployment logs
- Test locally first

---

**Happy Deploying! 🚀**
