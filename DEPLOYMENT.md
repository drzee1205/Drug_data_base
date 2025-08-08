# Paedia-Dose Production Deployment Guide

## 🚀 Vercel Deployment Setup

### Prerequisites
1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Vercel CLI**: Install with `npm i -g vercel`

### 1. Environment Variables
Create these environment variables in Vercel dashboard:

```bash
# Production Variables
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://paedia-dose.vercel.app
DATABASE_URL=file:./db/custom.db
```

### 2. Deploy via Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 3. Deploy via CLI
```bash
# Login to Vercel
vercel login

# Deploy to production
cd /path/to/your/project
vercel --prod
```

### 4. Custom Domain Setup
1. In Vercel dashboard → Project Settings → Domains
2. Add your custom domain: `paedia-dose.com`
3. Configure DNS records as instructed
4. Update environment variable: `NEXT_PUBLIC_APP_URL=https://paedia-dose.com`

## 🔧 Production Optimizations

### Performance
- ✅ Static generation for improved loading
- ✅ Image optimization with Next.js
- ✅ Bundle size optimization
- ✅ CDN caching for assets

### Security
- ✅ Security headers configured
- ✅ XSS protection enabled
- ✅ Content Security Policy
- ✅ HTTPS enforcement

### PWA Features
- ✅ Service worker caching
- ✅ Offline functionality
- ✅ App installation prompts
- ✅ iOS/Android optimization

## 📱 PWA Testing

### Installation Testing
1. **Chrome/Edge**: Look for install icon in address bar
2. **iOS Safari**: Share → Add to Home Screen
3. **Android Chrome**: Install banner should appear

### Offline Testing
1. Open DevTools → Network tab
2. Check "Offline" checkbox
3. Refresh page - should work offline
4. Test calculator functionality

## 🔍 Production Monitoring

### Vercel Analytics
- Enable in Project Settings → Analytics
- Monitor Core Web Vitals
- Track user engagement

### Error Monitoring
Consider adding:
- **Sentry**: `npm install @sentry/nextjs`
- **LogRocket**: For session replay
- **Vercel Speed Insights**: Built-in performance monitoring

## 🚀 Deployment Commands

```bash
# Build and test locally
npm run build
npm start

# Deploy with Vercel CLI
vercel --prod

# Check deployment status
vercel list

# View logs
vercel logs paedia-dose
```

## 📊 Post-Deployment Checklist

- [ ] Test PWA installation on iOS/Android
- [ ] Verify offline functionality
- [ ] Check Lighthouse scores (aim for 90+)
- [ ] Test all calculation features
- [ ] Verify drug database loading
- [ ] Test service worker caching
- [ ] Confirm mobile responsiveness
- [ ] Check SSL certificate
- [ ] Verify custom domain (if using)
- [ ] Test error handling

## 🔄 Continuous Deployment

Vercel automatically deploys:
- **Production**: On pushes to `main` branch
- **Preview**: On pushes to feature branches
- **Development**: Local development with `vercel dev`

## 🛠️ Troubleshooting

### Common Issues
1. **Build Errors**: Check `vercel logs` for details
2. **PWA Not Installing**: Verify manifest.json and HTTPS
3. **Service Worker Issues**: Clear cache and test in incognito
4. **Database Errors**: Ensure SQLite file is included in build

### Support
- Vercel Discord: [discord.gg/vercel](https://discord.gg/vercel)
- Documentation: [vercel.com/docs](https://vercel.com/docs)