# LedgerTalk - AI-Powered Finance Management

An intelligent financial management platform built specifically for Indian businesses with GST, TDS, and compliance automation.

## Features

- 🔐 **Secure Authentication** - Powered by Clerk
- 📊 **Smart Dashboard** - Real-time financial insights
- 🤖 **AI Assistant** - Personalized financial advice
- 📄 **Invoice Management** - IRN-compliant e-invoices
- 💼 **GST Compliance** - Automated calculations and filing
- 📧 **Employee Onboarding** - Automated workflow with PDF generation
- 🎨 **Modern UI** - Built with Tailwind CSS and Framer Motion

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Authentication

1. Create a [Clerk](https://clerk.com) account
2. Create a new application in Clerk Dashboard
3. Copy `.env.local.example` to `.env.local`
4. Add your Clerk API keys to `.env.local`

See [CLERK_SETUP.md](./CLERK_SETUP.md) for detailed instructions.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Authentication Flow

### For New Users
1. Visit the landing page at `/`
2. Click **"Get Started"** button
3. Sign up with email or social providers
4. Automatically redirected to `/dashboard` after signup

### For Existing Users
1. Click **"Sign In"** in the navbar
2. Enter credentials
3. Automatically redirected to `/dashboard` after login

### Protected Routes
The following routes require authentication:
- `/dashboard` - Main dashboard
- `/invoices` - Invoice management
- `/clients` - Client management
- `/transactions` - Transaction history
- `/compliance` - Compliance tracking
- `/tds` - TDS calculations
- `/assistant` - AI Assistant
- `/sales-agent` - Sales tools
- `/onboarding` - Employee onboarding

Attempting to access these routes without authentication will redirect to `/sign-in`.

## Project Structure

```
ledgertalk/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/       # Sign-in page
│   │   └── sign-up/       # Sign-up page
│   ├── dashboard/         # Protected dashboard
│   ├── api/
│   │   └── onboarding/    # Onboarding API endpoint
│   └── layout.tsx         # Root layout with ClerkProvider
├── components/
│   ├── Navbar.tsx         # Navigation with auth state
│   └── ui/                # Reusable UI components
├── db/
│   ├── schema.ts          # Database schema
│   └── index.ts           # Database connection
├── lib/
│   └── workflows/
│       └── onboarding.ts  # Onboarding workflow logic
├── middleware.ts          # Clerk auth middleware
└── public/
    └── docs/              # Generated PDFs
```

## Environment Variables

Required environment variables (copy from `.env.local.example`):

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database (Optional for onboarding feature)
DATABASE_URL=postgresql://...

# Email (Optional for onboarding feature)
RESEND_API_KEY=re_...
```

## Additional Documentation

- [CLERK_SETUP.md](./CLERK_SETUP.md) - Detailed Clerk authentication setup
- [ONBOARDING_README.md](./ONBOARDING_README.md) - Employee onboarding feature documentation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Authentication**: Clerk
- **UI**: Tailwind CSS, Framer Motion
- **Database**: PostgreSQL with Drizzle ORM
- **Email**: Resend
- **PDF Generation**: PDFKit

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
