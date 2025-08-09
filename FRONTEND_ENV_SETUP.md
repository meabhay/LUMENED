# 🌐 Frontend Environment Setup Guide for LumenEd

## 📋 Overview

This guide helps you set up the environment variables for your LumenEd React frontend application.

## 📁 File Structure

```
LumenEd/
├── .env                    # Your frontend environment variables (DO NOT COMMIT)
├── .env.example           # Template file for reference
├── server/
│   ├── .env              # Server environment variables
│   └── .env.example      # Server template
└── ...
```

## ⚙️ Frontend Environment Variables

### 🔐 **Important Rules for React Environment Variables:**

1. **Must start with `REACT_APP_`** - React only exposes environment variables that start with this prefix
2. **Are public** - These variables are embedded into the build and visible to users
3. **Never put secrets here** - API keys that should remain private go in the backend

## 📝 Required Variables

### 1. 🌐 **API Configuration**
```bash
REACT_APP_BASE_URL=http://localhost:4000/api/v1
```

**Purpose:** Backend server URL for all API calls
- Development: `http://localhost:4000/api/v1`
- Production: `https://yourdomain.com/api/v1`

### 2. 💳 **Razorpay Payment Integration**
```bash
REACT_APP_RAZORPAY_KEY=your-razorpay-key-id
```

**Purpose:** Razorpay public key for frontend payment processing
- This is the **Key ID** (public key), NOT the secret
- Get from: [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys)
- Example: `rzp_test_1234567890` (test) or `rzp_live_1234567890` (live)

## 🚀 Quick Setup

### Step 1: Copy Environment Template
```bash
cp .env.example .env
```

### Step 2: Edit Environment Variables
```bash
# Edit the .env file with your actual values
code .env
# or
nano .env
```

### Step 3: Basic Configuration

**For Development/Testing:**
```bash
# Backend API URL
REACT_APP_BASE_URL=http://localhost:4000/api/v1

# Razorpay Test Key (safe for testing)
REACT_APP_RAZORPAY_KEY=rzp_test_1234567890
```

**For Production:**
```bash
# Production API URL
REACT_APP_BASE_URL=https://yourdomain.com/api/v1

# Razorpay Live Key
REACT_APP_RAZORPAY_KEY=rzp_live_your_actual_key
```

### Step 4: Restart Development Server
```bash
# Important: Restart after changing environment variables
npm start
```

## 🔍 How Environment Variables Are Used

### 1. **API Calls** (`src/services/apis.js`)
```javascript
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1"
```

### 2. **Razorpay Payments** (`src/services/operations/studentFeaturesAPI.js`)
```javascript
const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    // ... other options
}
```

## 🛠️ Different Environment Setups

### Development Environment
```bash
# .env.development (optional)
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY=rzp_test_1234567890
```

### Production Environment
```bash
# .env.production (optional)
REACT_APP_BASE_URL=https://api.yourdomain.com/api/v1
REACT_APP_RAZORPAY_KEY=rzp_live_your_actual_key
```

### Testing Environment
```bash
# .env.test (optional)
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY=rzp_test_dummy
```

## 🔍 Troubleshooting

### Common Issues:

1. **Environment Variables Not Working**
   - Ensure they start with `REACT_APP_`
   - Restart development server after changes
   - Check for typos in variable names

2. **API Calls Failing**
   - Verify `REACT_APP_BASE_URL` is correct
   - Check if backend server is running
   - Ensure no trailing slashes

3. **Razorpay Payment Not Working**
   - Verify `REACT_APP_RAZORPAY_KEY` is the Key ID (not secret)
   - Use test keys during development
   - Check Razorpay dashboard for correct keys

4. **Variables Undefined in Code**
   - Variables not starting with `REACT_APP_` won't be available
   - Check spelling and case sensitivity

## ✅ Verification

### Check Environment Variables in Browser:
```javascript
// Open browser console and run:
console.log('Base URL:', process.env.REACT_APP_BASE_URL);
console.log('Razorpay Key:', process.env.REACT_APP_RAZORPAY_KEY);
```

### Expected Output:
```
Base URL: http://localhost:4000/api/v1
Razorpay Key: rzp_test_1234567890
```

## 🛡️ Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different keys** for development/production
3. **Only public information** in React environment variables
4. **Keep secrets in backend** environment variables
5. **Use `.env.example`** to share template with team

## 🌍 Deployment Considerations

### Netlify/Vercel:
- Set environment variables in dashboard
- Build will use production values

### Traditional Hosting:
- Create `.env.production` file
- Or set variables during build process

## 📋 Environment Variable Checklist

- [ ] `.env` file created in project root
- [ ] `REACT_APP_BASE_URL` set correctly
- [ ] `REACT_APP_RAZORPAY_KEY` set (test key for development)
- [ ] Development server restarted
- [ ] Variables verified in browser console
- [ ] `.env` added to `.gitignore`

---

**🎉 Your frontend is now properly configured with environment variables!**

## 🆘 Need Help?

- **API not connecting**: Check backend server is running on correct port
- **Payment failing**: Verify Razorpay keys in dashboard
- **Variables undefined**: Ensure `REACT_APP_` prefix and server restart

**Next Step:** Configure backend environment variables in `server/.env`
