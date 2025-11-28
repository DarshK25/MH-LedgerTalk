import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link href="/onboarding">
        <button>Get Started</button>
      </Link>
      <Link href="/sign-in">
        <button>Login</button>
      </Link>
    </div>
  );
}
