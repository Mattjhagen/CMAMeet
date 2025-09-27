# Auth0 Configuration Update for velour.live

## 🎯 **What You Need to Update**

Since you've switched to the `velour.live` domain, you need to update your Auth0 application settings to allow the new domain.

## 📋 **Step-by-Step Auth0 Dashboard Updates**

### 1. **Update Auth0 Application Settings**

1. Go to [Auth0 Dashboard](https://manage.auth0.com)
2. Navigate to **Applications** → **Applications**
3. Click on your **Velour Platform** application
4. Go to the **Settings** tab

### 2. **Update Allowed URLs**

Update these fields in your Auth0 application settings:

#### **Allowed Callback URLs:**
```
http://localhost:3000, https://velour.live, https://www.velour.live
```

#### **Allowed Logout URLs:**
```
http://localhost:3000, https://velour.live, https://www.velour.live
```

#### **Allowed Web Origins:**
```
http://localhost:3000, https://velour.live, https://www.velour.live
```

#### **Allowed Origins (CORS):**
```
http://localhost:3000, https://velour.live, https://www.velour.live
```

### 3. **Update Environment Variables**

Update your Render environment variables for the frontend service:

```env
REACT_APP_AUTH0_DOMAIN=vibecodes.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=OejuDvHhYdI5z7a2x6K3R5zWQxhy0gY2
REACT_APP_AUTH0_REDIRECT_URI=https://velour.live
REACT_APP_AUTH0_AUDIENCE=your-api-identifier
```

### 4. **Update Social Connections (if using Google/Twitter)**

If you have Google or Twitter social connections enabled:

#### **For Google OAuth:**
1. Go to **Authentication** → **Social**
2. Click on your **Google** connection
3. Update the **Authorized redirect URIs** to include:
   ```
   https://vibecodes.us.auth0.com/login/callback
   ```

#### **For Twitter OAuth:**
1. Go to **Authentication** → **Social**
2. Click on your **Twitter** connection
3. Update the **Callback URL** in your Twitter Developer App to:
   ```
   https://vibecodes.us.auth0.com/login/callback
   ```

### 5. **Update API Settings (if using Auth0 API)**

If you have an Auth0 API configured:

1. Go to **Applications** → **APIs**
2. Click on your API
3. Update **Allowed Origins (CORS)** to include:
   ```
   https://velour.live
   ```

## 🔧 **Render Environment Variables Update**

### Frontend Service Environment Variables:
```env
REACT_APP_AUTH0_DOMAIN=vibecodes.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=OejuDvHhYdI5z7a2x6K3R5zWQxhy0gY2
REACT_APP_AUTH0_REDIRECT_URI=https://velour.live
REACT_APP_AUTH0_AUDIENCE=your-api-identifier
REACT_APP_API_URL=https://velour-backend.onrender.com/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

### Backend Service Environment Variables:
```env
FRONTEND_URL=https://velour.live
```

## 🧪 **Testing the Auth0 Configuration**

### 1. **Test Local Development:**
```bash
cd client
npm start
```
- Visit `http://localhost:3000`
- Try logging in with Auth0
- Should redirect properly after authentication

### 2. **Test Production:**
- Visit `https://velour.live`
- Try logging in with Auth0
- Should redirect properly after authentication
- Check browser console for any CORS errors

### 3. **Test Social Logins:**
- Test Google login (if enabled)
- Test Twitter login (if enabled)
- Verify user profile data is captured correctly

## 🚨 **Common Issues & Solutions**

### **"Invalid Callback URL" Error:**
- **Cause:** Auth0 doesn't recognize the callback URL
- **Solution:** Add `https://velour.live` to Allowed Callback URLs in Auth0 dashboard

### **CORS Error:**
- **Cause:** Auth0 doesn't allow requests from the new domain
- **Solution:** Add `https://velour.live` to Allowed Web Origins in Auth0 dashboard

### **"Domain not found" Error:**
- **Cause:** Wrong Auth0 domain in environment variables
- **Solution:** Verify `REACT_APP_AUTH0_DOMAIN` is set correctly

### **Redirect Loop:**
- **Cause:** Mismatch between redirect URI in code and Auth0 settings
- **Solution:** Ensure both match exactly (including https/http)

## 📝 **Checklist**

### Auth0 Dashboard:
- [ ] Updated Allowed Callback URLs
- [ ] Updated Allowed Logout URLs  
- [ ] Updated Allowed Web Origins
- [ ] Updated Allowed Origins (CORS)
- [ ] Updated Social Connection URLs (if applicable)
- [ ] Updated API CORS settings (if applicable)

### Render Environment Variables:
- [ ] Updated `REACT_APP_AUTH0_REDIRECT_URI` to `https://velour.live`
- [ ] Updated `REACT_APP_API_URL` to backend URL
- [ ] Updated `FRONTEND_URL` in backend service

### Testing:
- [ ] Local development works
- [ ] Production login works
- [ ] Social logins work (if enabled)
- [ ] No CORS errors in browser console
- [ ] User profile data loads correctly

## 🔄 **After Updates**

1. **Redeploy your frontend service** on Render
2. **Test the authentication flow** on `https://velour.live`
3. **Check browser console** for any errors
4. **Verify user data** is being captured correctly

## 🆘 **Need Help?**

If you're still having issues:
1. Check the Auth0 logs in your dashboard
2. Check the browser console for specific error messages
3. Verify all URLs match exactly (case-sensitive)
4. Test with a fresh browser session (clear cookies/cache)
