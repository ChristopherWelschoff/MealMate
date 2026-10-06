import { useSession, signIn, signOut } from "next-auth/react";
import { Spinner } from "@/components/StateMessages";
import Button, { ButtonLink } from "@/components/Button";
import ThemeToggle from "@/components/ThemeToggle";

function SettingsCard() {
  return (
    <div className="flex flex-col gap-2">
      <p className="px-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
        Settings
      </p>
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <ThemeToggle />
      </div>
    </div>
  );
}

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
      <div className="flex min-h-[70vh] flex-col px-4">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h2 className="font-logo text-3xl text-primary">Your profile</h2>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Sign in to save favorites and share your own recipes.
          </p>
          <Button onClick={() => signIn("google")} className="mt-6">
            Login
          </Button>
        </div>

        <div className="mx-auto mt-auto w-full max-w-xs pb-6">
          <SettingsCard />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] flex-col px-4">
      <div className="mb-4 text-center">
        <h1 className="font-logo text-4xl text-primary">
          {session.user?.name}
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {session.user?.email}
        </p>
      </div>

      <div className="mx-auto mt-auto flex w-full max-w-xs flex-col gap-3 pb-6">
        {session.user?.isAdmin && (
          <ButtonLink href="/admin" variant="outline">
            Admin
          </ButtonLink>
        )}

        <div className="my-3">
          <SettingsCard />
        </div>

        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </Button>
      </div>
    </div>
  );
}
