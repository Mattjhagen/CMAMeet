# Velour.live Deployment Fix

## Issue Identified
The deployment is failing because Render is running `npm run dev` instead of the production start command. This happens when Render doesn't properly use the `render.yaml` configuration.

## Solution

### Step 1: Manual Render Service Configuration

Since the `render.yaml` might not be working as expected, you need to manually configure your Render services:

#### Backend Service Configuration:
1. Go to your Render dashboard
2. Click on your backend service (velour-backend)
3. Go to "Settings" tab
4. Update these settings:

**Root Directory:**
```
server
```

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
npm start
```

**Node Version:**
```
18.x
```

#### Environment Variables for Backend:
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/velour?retryWrites=true&w=majority
JWT_SECRET=your-jwt-secret-here
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://velour.live
```

#### Frontend Service Configuration:
1. Go to your frontend service (velour-frontend)
2. Go to "Settings" tab
3. Update these settings:

**Root Directory:**
```
client
```

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
build
```

#### Environment Variables for Frontend:
```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here
REACT_APP_API_URL=https://velour-backend.onrender.com/api
```

### Step 2: Custom Domain Setup

1. Go to your frontend service settings
2. Click "Custom Domains"
3. Add `velour.live`
4. Add `www.velour.live` (optional)
5. Update DNS records as instructed by Render

### Step 3: Update Environment Variables After Domain Setup

Once your custom domain is active, update:

**Backend Environment Variable:**
```env
FRONTEND_URL=https://velour.live
```

**Frontend Environment Variable:**
```env
REACT_APP_API_URL=https://velour-backend.onrender.com/api
```

### Step 4: Test Deployment

1. **Backend Test:**
   - Visit: `https://velour-backend.onrender.com/api/test`
   - Should return: `{"success": true, "message": "API is working!"}`

2. **Frontend Test:**
   - Visit: `https://velour.live`
   - Should load your React application

3. **Full Integration Test:**
   - Try user registration
   - Test authentication flow
   - Test Stripe integration

### Step 5: Stripe Webhook Configuration

Update your Stripe webhook endpoint to:
```
https://velour-backend.onrender.com/api/webhooks/stripe
```

## Troubleshooting

### If Backend Still Fails:
1. Check that the Root Directory is set to `server`
2. Verify the Start Command is `npm start` (not `npm run dev`)
3. Ensure all environment variables are set
4. Check the Render logs for specific error messages

### If Frontend Fails:
1. Check that the Root Directory is set to `client`
2. Verify the Build Command includes `npm run build`
3. Ensure the Publish Directory is set to `build`
4. Check that all environment variables are set

### Common Issues:
1. **"concurrently: not found"** - This means Render is still running the dev command
2. **Build failures** - Check that all dependencies are in package.json
3. **CORS errors** - Verify FRONTEND_URL environment variable
4. **Database connection** - Check MONGODB_URI and MongoDB Atlas settings

## Next Steps After Successful Deployment

1. Set up SSL certificates (Render handles this automatically)
2. Configure your DNS to point to Render
3. Test all functionality
4. Set up monitoring and alerts
5. Configure backups

## Environment Variables Checklist

### Backend Required:
- [ ] NODE_ENV=production
- [ ] PORT=10000
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_PUBLISHABLE_KEY
- [ ] STRIPE_WEBHOOK_SECRET
- [ ] FRONTEND_URL=https://velour.live

### Frontend Required:
- [ ] REACT_APP_STRIPE_PUBLISHABLE_KEY
- [ ] REACT_APP_API_URL=https://velour-backend.onrender.com/api

### Optional:
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
