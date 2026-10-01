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

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <button type="button" onClick={() => signIn("google")}>
          Sign in
        </button>
      </div>
    );
  }

  if (status === "authenticated") {
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
        <div className="flex min-h-[60vh] items-center justify-center">
          <button type="button" onClick={() => signIn("google")}>
            Sign in
          </button>
        </div>
      </>
    );
  }
}
