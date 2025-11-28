import Link from "next/link";

export default function SignInPage() {
  return (
    <div>
      <div>Sign In Page</div>
      <Link href="/dashboard">
        <button>Continue to Dashboard</button>
      </Link>
    </div>
  );
}
