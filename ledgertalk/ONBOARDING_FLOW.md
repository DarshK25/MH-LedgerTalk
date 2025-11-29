# User Onboarding Flow Documentation

## Overview
LedgerTalk now features a comprehensive onboarding flow that guides new users through setting up their account and organization. The flow is designed to be flexible, allowing users to join existing organizations via invite codes or create new ones.

## Flow Steps

### 1. Initial Choice
When a user signs up via Clerk, they are redirected to `/onboarding` where they are presented with two options:
- **I have an invite code**: For users invited to join an existing organization
- **Join or create organization**: For users who want to join an existing org or create a new one

### 2. Invite Code Path

#### Step 2a: Enter Invite Code
- User enters their invite code
- System validates the code via `/api/onboarding/validate-invite`
- Checks if code is:
  - Valid format
  - Active (not expired)
  - Associated with an existing organization

#### Step 2b: Confirm Organization
- Displays organization details:
  - Organization name
  - Description
  - Industry
  - Assigned role
- User confirms they want to join

#### Step 2c: Join Organization
- Creates user-organization relationship
- Assigns role from invite code
- Marks onboarding as complete
- Redirects to dashboard

### 3. Join/Create Organization Path

#### Step 3a: Check Existing Organizations
- System checks for organizations matching user's email domain
- Queries `/api/onboarding/check-organizations`
- If matches found → Show existing organizations
- If no matches → Skip to Create Organization

#### Step 3b: Join Existing Organization (Optional)
- Displays list of organizations matching email domain
- Shows organization details:
  - Name
  - Description
  - Industry
  - Team size
- User can:
  - Select an organization to join
  - Choose to create a new organization instead

#### Step 3c: Create New Organization
Collects comprehensive business information:

**Basic Information:**
- Organization name (required)
- Industry (required)
- Legal structure (required)
- Business stage (required)

**Operations Information:**
- Team size (required)
- Revenue range (optional)
- Description (optional)

**Departments:**
Multi-select from:
- Sales
- Marketing
- Finance
- HR
- Operations
- IT
- Customer Support
- Product
- Legal

**Agent Configuration:**
The collected data is used to configure AI agents:
```json
{
  "industry": "Technology",
  "businessStage": "Startup",
  "departments": ["Sales", "Finance", "IT"],
  "teamSize": "11-50",
  "revenueRange": "₹10L - ₹1Cr",
  "features": {
    "gstCompliance": true,
    "invoiceGeneration": true,
    "financialAnalysis": true,
    "aiAssistant": true
  }
}
```

#### Step 3d: Team Invitations
- Placeholder for inviting team members
- Can be skipped
- Actual invitation functionality available in dashboard

### 4. Product Tour
Final step showing key platform features:
- **Dashboard**: Real-time financial insights and analytics
- **AI Assistant**: Personalized financial advice
- **GST Compliance**: Automated GST calculations and filing
- **Team Management**: Collaborative financial task management

### 5. Completion
- Marks onboarding as complete via `/api/onboarding/complete`
- Redirects user to dashboard
- Dashboard now has full context about:
  - User's organization
  - Their role
  - Organization configuration
  - AI agent settings

## API Endpoints

### `/api/onboarding/validate-invite` (POST)
**Request:**
```json
{
  "code": "ABC123XYZ"
}
```

**Response (Success):**
```json
{
  "valid": true,
  "organization": {
    "id": 1,
    "name": "Acme Corp",
    "description": "...",
    "industry": "Technology"
  },
  "role": "member",
  "inviteCodeId": 5
}
```

### `/api/onboarding/check-organizations` (POST)
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "organizations": [
    {
      "id": 1,
      "name": "Example Corp",
      "description": "...",
      "industry": "Technology",
      "teamSize": "11-50"
    }
  ]
}
```

### `/api/onboarding/join-with-invite` (POST)
**Request:**
```json
{
  "code": "ABC123XYZ",
  "userId": "user_xxx"
}
```

**Response:**
```json
{
  "success": true
}
```

### `/api/onboarding/join-organization` (POST)
**Request:**
```json
{
  "organizationId": 1,
  "userId": "user_xxx"
}
```

**Response:**
```json
{
  "success": true
}
```

### `/api/onboarding/create-organization` (POST)
**Request:**
```json
{
  "name": "My Company",
  "industry": "Technology",
  "legalStructure": "Private Limited",
  "businessStage": "Startup",
  "description": "...",
  "teamSize": "11-50",
  "revenueRange": "₹10L - ₹1Cr",
  "departments": ["Sales", "Finance", "IT"],
  "userId": "user_xxx"
}
```

**Response:**
```json
{
  "success": true,
  "organization": {
    "id": 1,
    "name": "My Company",
    ...
  }
}
```

### `/api/onboarding/complete` (POST)
**Request:**
```json
{
  "userId": "user_xxx"
}
```

**Response:**
```json
{
  "success": true
}
```

## Database Schema

### Organizations Table
```typescript
{
  id: serial
  name: string
  description: string
  industry: string
  legalStructure: string
  businessStage: string
  teamSize: string
  revenueRange: string
  emailDomain: string
  agentConfig: json  // AI agent configuration
  departments: string
  createdAt: timestamp
}
```

### User Organizations Table
```typescript
{
  id: serial
  userId: string  // Clerk user ID
  organizationId: number
  role: enum('owner', 'admin', 'manager', 'member')
  joinedAt: timestamp
}
```

### Invite Codes Table
```typescript
{
  id: serial
  code: string
  organizationId: number
  role: enum('owner', 'admin', 'manager', 'member')
  createdBy: string
  expiresAt: timestamp
  isActive: boolean
  createdAt: timestamp
}
```

### User Onboarding Table
```typescript
{
  id: serial
  userId: string
  hasCompletedOnboarding: boolean
  onboardingCompletedAt: timestamp
  inviteCodeUsed: string
  organizationCreated: boolean
}
```

## Environment Configuration

Update `.env.local` to redirect new signups to onboarding:

```env
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

Existing users signing in still go to dashboard:
```env
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
```

## UI Components Used

- **Framer Motion**: For smooth step transitions and animations
- **Shadcn/ui**: Card, Button, Input, Select, Textarea, Checkbox components
- **Lucide Icons**: Building2, Users, Briefcase, TrendingUp, CheckCircle2, ArrowRight, ArrowLeft, Loader2

## Protected Routes

The onboarding page is protected by middleware. Only authenticated users can access it:

```typescript
// middleware.ts
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
    // ... other protected routes
  ],
};
```

## Next Steps

After completing onboarding:
1. User is redirected to `/dashboard`
2. Dashboard reads user's organization from database
3. AI agents are configured based on `agentConfig`
4. User can invite team members from dashboard
5. Organization settings can be updated from settings page

## Future Enhancements

- Email verification for organization domain
- Admin approval workflow for joining organizations
- Team invitation emails during onboarding
- Custom onboarding flows based on industry
- Integration with accounting software during setup
- Automated GST registration check
