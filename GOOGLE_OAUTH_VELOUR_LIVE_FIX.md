# Fix Google OAuth redirect_uri_mismatch for velour.live

## 🚨 **Error You're Seeing**
```
Error 400: redirect_uri_mismatch
Access blocked: PacMac Mobile MarketPlace's request is invalid
```

## 🔧 **Root Cause**
Your Google OAuth application is configured with old redirect URIs that don't include `velour.live`. Google is rejecting the authentication request because the redirect URI doesn't match what's configured in Google Cloud Console.

## 📋 **Step-by-Step Fix**

### 1. **Go to Google Cloud Console**
1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with your Google account (`mattjhagen0@gmail.com`)
3. Select your project (likely named "PacMac Mobile MarketPlace" or similar)

### 2. **Navigate to OAuth Configuration**
1. Go to **APIs & Services** → **Credentials**
2. Find your OAuth 2.0 Client ID (the one causing the error)
3. Click on it to edit

### 3. **Update Authorized Redirect URIs**
Add these URIs to your **Authorized redirect URIs**:

```
https://velour.live
https://www.velour.live
https://velour.live/callback
https://www.velour.live/callback
http://localhost:3000
http://localhost:3000/callback
```

### 4. **Update Authorized JavaScript Origins**
Add these origins to **Authorized JavaScript origins**:

```
https://velour.live
https://www.velour.live
http://localhost:3000
```

### 5. **Save Changes**
1. Click **Save** at the bottom
2. Wait 5-10 minutes for changes to propagate

## 🔍 **Finding Your OAuth Client**

If you can't find your OAuth client:

### **Option A: Search by Name**
1. In Google Cloud Console → **APIs & Services** → **Credentials**
2. Look for "PacMac Mobile MarketPlace" or similar
3. Click on the OAuth 2.0 Client ID

### **Option B: Check Auth0 Dashboard**
1. Go to [Auth0 Dashboard](https://manage.auth0.com)
2. Go to **Authentication** → **Social**
3. Find your **Google** connection
4. Check the **Client ID** and **Client Secret**
5. Use these to find the right OAuth client in Google Cloud Console

## 🧪 **Testing the Fix**

### 1. **Wait for Propagation**
- Google OAuth changes can take 5-10 minutes to take effect
- Don't test immediately after saving

### 2. **Test Local Development**
```bash
cd client
npm start
```
- Visit `http://localhost:3000`
- Try Google login
- Should work without errors

### 3. **Test Production**
- Visit `https://velour.live`
- Try Google login
- Should redirect properly after authentication

## 🚨 **Common Issues & Solutions**

### **"Still getting redirect_uri_mismatch"**
- **Cause:** Changes haven't propagated yet
- **Solution:** Wait 10-15 minutes and try again

### **"Can't find my OAuth client"**
- **Cause:** Wrong Google account or project
- **Solution:** Check you're in the right Google Cloud project

### **"Multiple OAuth clients"**
- **Cause:** You have several OAuth clients
- **Solution:** Update the one that matches your Auth0 configuration

### **"Auth0 still using old settings"**
- **Cause:** Auth0 cached the old configuration
- **Solution:** Clear Auth0 cache or wait for it to refresh

## 📝 **Verification Checklist**

- [ ] Added `https://velour.live` to Authorized redirect URIs
- [ ] Added `https://velour.live` to Authorized JavaScript origins
- [ ] Saved changes in Google Cloud Console
- [ ] Waited 5-10 minutes for propagation
- [ ] Tested local development (http://localhost:3000)
- [ ] Tested production (https://velour.live)
- [ ] No more redirect_uri_mismatch errors

## 🔄 **If Still Having Issues**

### **Check Auth0 Configuration:**
1. Go to Auth0 Dashboard
2. **Authentication** → **Social** → **Google**
3. Verify the **Client ID** matches Google Cloud Console
4. Check that **Callback URL** is set correctly

### **Check Google Cloud Console:**
1. Make sure you're in the right project
2. Verify the OAuth client is enabled
3. Check that all required URIs are added

### **Debug Steps:**
1. Check browser console for specific error messages
2. Verify the exact redirect URI being sent
3. Compare with what's configured in Google Cloud Console

## 🎯 **Expected Result**

After fixing this, you should be able to:
- ✅ Sign in with Google on `velour.live`
- ✅ No more redirect_uri_mismatch errors
- ✅ Proper redirect back to your app after authentication
- ✅ User profile data captured correctly

The key is making sure Google Cloud Console has the exact same redirect URIs that your Auth0 application is sending!
