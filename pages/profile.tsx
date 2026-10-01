import { Spinner } from "@/components/StateMessages";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
        <h2 className="font-logo text-3xl text-primary">
          You are not logged in
        </h2>
        <button
          onClick={() => signIn("google")}
          type="button"
          className="my-5 rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-md transition hover:bg-primary/90"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="font-logo text-4xl text-primary">
          {session.user?.name}
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {session.user?.email}
        </p>
      </div>
      <div className=" text-center">
        <button
          onClick={() => signOut()}
          type="button"
          className=" my-5 rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-md transition hover:bg-primary/90"
        >
          Logout
        </button>
      </div>
    </>
  );
}
