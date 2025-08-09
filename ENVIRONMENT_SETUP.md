# 🔧 Environment Setup Guide for LumenEd Server

## 📋 Overview

This guide helps you set up all the required environment variables for your LumenEd server to run completely.

## 📁 File Structure

```
LumenEd/
└── server/
    ├── .env              # Your actual environment variables (DO NOT COMMIT)
    ├── .env.example      # Template file for reference
    └── ...
```

## ⚙️ Required Environment Variables

### 1. 🗄️ **Database (MongoDB)**

#### Option A: Local MongoDB
```bash
MONGODB_URL=mongodb://localhost:27017/lumened
```
- Install MongoDB locally
- Make sure MongoDB service is running

#### Option B: MongoDB Atlas (Cloud)
```bash
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/lumened?retryWrites=true&w=majority
```
- Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a cluster and get connection string

### 2. 🔐 **JWT Authentication**
```bash
JWT_SECRET=your-super-secret-jwt-key-make-this-very-long-and-random-123456789
```
- Use a long, random string (50+ characters)
- **Never share this secret key!**

### 3. 📤 **File Upload (Cloudinary)**

Create account at [Cloudinary](https://cloudinary.com/):

```bash
CLOUD_NAME=your-cloudinary-cloud-name
API_KEY=your-cloudinary-api-key  
API_SECRET=your-cloudinary-api-secret
```

**Steps:**
1. Go to [cloudinary.com/console](https://cloudinary.com/console)
2. Sign up for free account
3. Copy Cloud Name, API Key, and API Secret from dashboard

### 4. 💳 **Payment Gateway (Razorpay)**

Create account at [Razorpay](https://razorpay.com/):

```bash
RAZORPAY_KEY=rzp_test_1234567890
RAZORPAY_SECRET=your-razorpay-secret-key
```

**Steps:**
1. Go to [dashboard.razorpay.com](https://dashboard.razorpay.com/app/keys)
2. Create account and verify
3. Go to Settings > API Keys
4. Generate Test/Live keys

### 5. 📧 **Email Service (Gmail)**

For Gmail (recommended):

```bash
MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-specific-password
```

**Steps to get Gmail App Password:**
1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account Settings
3. Security > App Passwords
4. Generate app password for "Mail"
5. Use the generated 16-character password

### 6. 🖥️ **Server Configuration**
```bash
PORT=4000
FRONTEND_URL=http://localhost:3000
```

## 🚀 Quick Setup

### Step 1: Copy Environment Template
```bash
cd server
cp .env.example .env
```

### Step 2: Edit Environment Variables
```bash
# Edit the .env file with your actual values
nano .env
# or
code .env
```

### Step 3: Minimum Setup for Testing

If you just want to test without all services:

```bash
# Required for basic functionality
MONGODB_URL=mongodb://localhost:27017/lumened
JWT_SECRET=any-long-random-string-here-123456789
PORT=4000

# Optional (will disable features but won't crash)
CLOUD_NAME=dummy
API_KEY=dummy  
API_SECRET=dummy
RAZORPAY_KEY=dummy
RAZORPAY_SECRET=dummy
MAIL_HOST=smtp.gmail.com
MAIL_USER=dummy@gmail.com
MAIL_PASS=dummy
```

### Step 4: Test Server
```bash
npm run dev
```

## 🔍 Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Install MongoDB locally or set up Atlas
   - Check connection string format

2. **Razorpay Key Error** 
   - Most common issue - server crashes without Razorpay keys
   - Set dummy values for testing
   - Get real keys from Razorpay dashboard

3. **Email Sending Failed**
   - Gmail requires App Password, not regular password
   - Enable 2FA first, then generate App Password

4. **File Upload Failed**
   - Check Cloudinary credentials
   - Ensure API secret is correct

## 🛡️ Security Best Practices

1. **Never commit `.env` file** to git
2. Use different keys for development/production
3. Use strong JWT secrets (50+ characters)
4. Enable MongoDB authentication in production
5. Use environment-specific Razorpay keys

## ✅ Verification

Once configured properly, you should see:
```
DB Connected Successfully
App is running at 4000
```

## 🆘 Need Help?

- Check MongoDB connection: Use MongoDB Compass
- Test Cloudinary: Upload test image in dashboard  
- Test Razorpay: Create test payment in dashboard
- Test Email: Send test email through Gmail

---

**🎉 After setup, your server will run completely without crashes!**
