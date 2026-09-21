import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-20">
      <h1 className="text-center text-3xl text-green-800">
        Welcome to MealMate
      </h1>

      <Link href="/landingPage">
        <button className="rounded-lg border-2 border-green-800 px-6 py-2 text-green-800">
          Continue
        </button>
      </Link>
    </main>
  );
}
