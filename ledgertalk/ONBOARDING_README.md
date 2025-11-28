# Onboarding Workflow Implementation

This implementation provides an automated employee onboarding system with the following features:

## Features

1. **Employee Database Management** - Automatically creates employee records
2. **Offer Letter Generation** - Generates PDF offer letters using PDFKit
3. **Email Notifications** - Sends welcome emails using Resend
4. **Task Automation** - Creates onboarding tasks automatically

## Project Structure

```
ledgertalk/
├── db/
│   ├── index.ts          # Database configuration
│   └── schema.ts         # Database schema (employees, tasks)
├── lib/
│   └── workflows/
│       └── onboarding.ts # Onboarding workflow class
├── app/
│   └── api/
│       └── onboarding/
│           └── route.ts  # API endpoint for onboarding
└── public/
    └── docs/            # Generated PDF storage
```

## Setup Instructions

### 1. Install Dependencies

All required dependencies have been installed:
- `drizzle-orm` - Database ORM
- `postgres` - PostgreSQL driver
- `pdfkit` - PDF generation
- `@types/pdfkit` - TypeScript types for PDFKit
- `resend` - Email service

### 2. Configure Environment Variables

Create a `.env.local` file in the `ledgertalk` directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/ledgertalk
RESEND_API_KEY=re_your_api_key_here
```

### 3. Database Setup

You'll need to:
1. Set up a PostgreSQL database
2. Run migrations to create the tables (employees, tasks)

**Database Schema:**
- **employees**: id, businessId, name, role, email, status, joinedAt, createdAt, updatedAt
- **tasks**: id, businessId, title, description, status, dueDate, createdAt, updatedAt

### 4. Usage

#### Using the API Endpoint

```bash
curl -X POST http://localhost:3000/api/onboarding \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "role": "Software Engineer",
    "email": "john@example.com",
    "businessId": 1
  }'
```

#### Using the Workflow Directly

```typescript
import { onboardingWorkflow } from '@/lib/workflows/onboarding';

const result = await onboardingWorkflow.execute(
  "John Doe",
  "Software Engineer",
  "john@example.com",
  1
);

console.log(result.logs);
console.log(`Employee ID: ${result.employeeId}`);
```

## Workflow Steps

The onboarding workflow performs these steps automatically:

1. **Create Employee Record** - Adds employee to database with 'onboarding' status
2. **Generate Offer Letter** - Creates a PDF offer letter in `public/docs/`
3. **Send Welcome Email** - Sends welcome email via Resend (if API key configured)
4. **Create Tasks** - Generates 4 onboarding tasks:
   - Setup company email
   - Grant access to Slack/Teams
   - Prepare laptop and hardware
   - Schedule orientation session

## API Response

Success response:
```json
{
  "message": "Onboarding completed successfully",
  "employeeId": 123,
  "logs": [
    "Starting onboarding for John Doe (Software Engineer)...",
    "✅ Employee record created (ID: 123)",
    "✅ Offer letter generated: Offer_Letter_John_Doe_1234567890.pdf",
    "✅ Welcome email sent to john@example.com",
    "✅ 4 onboarding tasks created"
  ]
}
```

## Email Configuration

To enable email sending:
1. Sign up at [Resend](https://resend.com)
2. Get your API key
3. Add it to `.env.local` as `RESEND_API_KEY`

Without an API key, the workflow will still work but will log email simulation messages.

## Next Steps

1. Set up your PostgreSQL database
2. Configure environment variables
3. Run database migrations to create tables
4. Test the API endpoint
5. Integrate with your UI (e.g., in `app/onboarding/page.tsx`)

## Files Created

- ✅ `db/schema.ts` - Database schema definitions
- ✅ `db/index.ts` - Database connection
- ✅ `lib/workflows/onboarding.ts` - Onboarding workflow logic
- ✅ `app/api/onboarding/route.ts` - API endpoint
- ✅ `public/docs/` - Directory for generated PDFs
- ✅ `.env.example` - Environment variables template
