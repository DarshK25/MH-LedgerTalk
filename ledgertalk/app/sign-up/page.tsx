import Link from "next/link";

export default function SignUpPage() {
  return (
    <div>
      <div>Sign Up Page</div>
      <Link href="/onboarding">
        <button>Continue to Onboarding</button>
      </Link>
    </div>
  );
}
