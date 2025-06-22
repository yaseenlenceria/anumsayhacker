# Deployment Guide

## GitHub → Netlify Deployment

### Quick Setup

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Login to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Build settings are auto-detected from `netlify.toml`

3. **Deploy:**
   - Netlify will automatically build and deploy
   - Your site will be available at a generated URL
   - Connect your custom domain in Netlify settings

### Build Configuration

The project is configured with:
- **Build command:** `npm run build`
- **Publish directory:** `dist/public`
- **Functions directory:** `netlify/functions`

### API Endpoints

All API routes are handled by serverless functions:
- `/api/platforms` → Platform data
- `/api/signals` → Trading signals
- `/api/stats` → Analytics data
- `/api/auth/*` → Authentication

### Environment Variables

For production deployment, no environment variables are required as the app uses mock data suitable for demonstration.

### Troubleshooting

If deployment fails:
1. Check build logs in Netlify dashboard
2. Ensure all dependencies are in `package.json`
3. Verify `netlify.toml` configuration
4. Check serverless function syntax

### Local Testing

Test the build locally:
```bash
npm run build
# Serve the dist/public folder to test static files
```

### Post-Deployment

After successful deployment:
1. Test all pages and functionality
2. Verify API endpoints are working
3. Check responsive design on mobile
4. Set up custom domain if needed