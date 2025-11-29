# Clerk Authentication Setup Guide

This project uses Clerk for authentication. Follow these steps to set it up:

## 1. Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

## 2. Get Your API Keys

1. In your Clerk Dashboard, go to **API Keys**
2. Copy your **Publishable Key** and **Secret Key**

## 3. Configure Environment Variables

Create a `.env.local` file in the `ledgertalk` directory (copy from `.env.local.example`):

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## 4. Configure Clerk Dashboard

In your Clerk Dashboard:

1. Go to **Paths** settings
2. Set the following paths:
   - Sign-in path: `/sign-in`
   - Sign-up path: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

## 5. Authentication Flow

### How It Works

1. **Unauthenticated Users**: 
   - Can view the landing page (`/`)
   - Clicking "Get Started" redirects to `/sign-up`
   - Clicking "Sign In" redirects to `/sign-in`

2. **Protected Routes**: 
   - All routes under `/dashboard`, `/invoices`, `/clients`, etc. are protected
   - Attempting to access without authentication redirects to `/sign-in`

3. **After Sign Up/In**:
   - Users are automatically redirected to `/dashboard`
   - User button appears in the navbar for account management and sign-out

### Protected Routes

The following routes require authentication (configured in `middleware.ts`):
- `/dashboard/*`
- `/invoices/*`
- `/clients/*`
- `/transactions/*`
- `/compliance/*`
- `/tds/*`
- `/assistant/*`
- `/sales-agent/*`
- `/onboarding/*`

## 6. Testing Authentication

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Get Started" - you'll be redirected to sign-up
4. Create an account
5. You'll be automatically redirected to the dashboard
6. Try logging out using the user button in the navbar
7. Try accessing `/dashboard` directly - you'll be redirected to sign-in

## 7. Customization

### Appearance
You can customize the Clerk components' appearance in the sign-in/sign-up pages:

```tsx
<SignIn 
  appearance={{
    elements: {
      rootBox: "mx-auto",
      card: "shadow-2xl",
    },
  }}
/>
```

### User Button
The `<UserButton />` component in the Navbar provides:
- User profile management
- Account settings
- Sign out functionality

## Troubleshooting

**Issue**: "Clerk: Missing publishable key"
- **Solution**: Make sure `.env.local` exists with your Clerk keys

**Issue**: Redirects not working
- **Solution**: Check that the URLs in `.env.local` match your Clerk Dashboard settings

**Issue**: Protected routes accessible without auth
- **Solution**: Verify `middleware.ts` is in the root of your app directory

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Middleware](https://clerk.com/docs/references/nextjs/clerk-middleware)
