# 🚀 Quick Start Guide

## Prerequisites Checklist

Before running the application, make sure you have:

- ✅ Node.js installed (v18 or higher)
- ✅ npm or yarn package manager
- ✅ A Clerk account (free tier available)

## Step-by-Step Setup

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16
- Clerk (authentication)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Drizzle ORM (database)
- PDFKit (PDF generation)
- Resend (email service)

### Step 2: Set Up Clerk Authentication

1. **Create a Clerk Account**
   - Go to https://clerk.com
   - Sign up for a free account
   - Click "Create Application"
   - Choose a name for your app
   - Select authentication methods (Email, Google, etc.)

2. **Get Your API Keys**
   - In Clerk Dashboard, go to "API Keys"
   - Copy your **Publishable Key** (starts with `pk_test_`)
   - Copy your **Secret Key** (starts with `sk_test_`)

3. **Create Environment File**
   ```bash
   # Create .env.local file
   cp .env.local.example .env.local
   ```

4. **Add Your Clerk Keys**
   
   Open `.env.local` and update:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
   CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE
   ```

5. **Configure Clerk Dashboard Settings**
   - In Clerk Dashboard, go to "Paths"
   - Set:
     - Sign-in path: `/sign-in`
     - Sign-up path: `/sign-up`
     - Home URL: `http://localhost:3000`
     - After sign-in: `/dashboard`
     - After sign-up: `/dashboard`

### Step 3: Run the Application

```bash
npm run dev
```

The app will start at http://localhost:3000

### Step 4: Test the Authentication Flow

1. **Visit the Landing Page**
   - Open http://localhost:3000
   - You'll see the LedgerTalk homepage

2. **Sign Up**
   - Click "Get Started" button
   - Fill in your details
   - Complete the sign-up process
   - You'll be automatically redirected to the dashboard

3. **Sign Out**
   - Click your profile picture in the navbar
   - Click "Sign Out"

4. **Sign In**
   - Click "Sign In" in the navbar
   - Enter your credentials
   - You'll be redirected to the dashboard

5. **Test Protected Routes**
   - While signed out, try to visit http://localhost:3000/dashboard
   - You'll be redirected to the sign-in page
   - Sign in and you'll be taken to the dashboard

## Troubleshooting

### Issue: "Clerk: Missing publishable key"

**Solution:**
- Make sure `.env.local` file exists in the `ledgertalk` directory
- Check that the file contains `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Restart the dev server after adding the file

### Issue: Can't access protected routes even when signed in

**Solution:**
- Clear your browser cookies and cache
- Make sure `middleware.ts` exists in the root directory
- Check that both Clerk keys are correctly set in `.env.local`

### Issue: Redirects not working properly

**Solution:**
- Verify the URLs in `.env.local` match:
  ```env
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
  ```
- Restart the dev server

### Issue: Styling looks broken

**Solution:**
- Make sure all dependencies are installed
- Clear `.next` directory and restart: `rm -rf .next && npm run dev`

## What You Should See

### 1. Landing Page (Not Signed In)
- LedgerTalk branding
- "Get Started" button → redirects to sign-up
- "Sign In" button → redirects to sign-in

### 2. Landing Page (Signed In)
- LedgerTalk branding
- "Dashboard" button → goes to dashboard
- User profile picture (clickable for account menu)

### 3. Sign Up Page
- Clean, modern sign-up form
- Email and social authentication options
- After successful signup → automatic redirect to dashboard

### 4. Dashboard (Protected)
- Only accessible when signed in
- Shows user information
- Navigation to other features

## Next Steps

Once you have authentication working:

1. **Optional: Set up Database** (for onboarding feature)
   - Install PostgreSQL
   - Add `DATABASE_URL` to `.env.local`
   - See `ONBOARDING_README.md` for details

2. **Optional: Set up Email** (for onboarding feature)
   - Get Resend API key
   - Add `RESEND_API_KEY` to `.env.local`

3. **Customize the App**
   - Update branding in `components/Navbar.tsx`
   - Modify colors in `app/globals.css`
   - Add your business logic

## Support

For more detailed information:
- [CLERK_SETUP.md](./CLERK_SETUP.md) - Complete Clerk setup guide
- [ONBOARDING_README.md](./ONBOARDING_README.md) - Onboarding feature guide
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Summary

✅ **What's Implemented:**
- Clerk authentication (sign-in/sign-up)
- Protected routes (middleware)
- Automatic redirects after auth
- User profile management
- Smooth authentication flow
- Modern, responsive UI

✅ **What Works:**
- Landing page accessible to everyone
- Dashboard and other pages protected by auth
- Automatic redirect to sign-in for protected pages
- Automatic redirect to dashboard after sign-in/sign-up
- User button for profile and sign-out
