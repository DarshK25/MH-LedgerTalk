import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div>
      <div>User Onboarding Page</div>
      <Link href="/dashboard">
        <button>Continue to Dashboard</button>
      </Link>
    </div>
  );
}
