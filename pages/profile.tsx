import { Spinner } from "@/components/StateMessages";
import { useSession, signIn, signOut } from "next-auth/react";
import Button, { ButtonLink } from "@/components/Button";

import PageHeader from "@/components/PageHeader";

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
      <>
        <PageHeader header="Profile" subheader="you are not logged in" />
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
          <h2 className="font-logo text-3xl text-primary">Oooops...!</h2>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Login to see you profile
          </p>
          <button
            onClick={() => signIn("google")}
            type="button"
            className="my-5 rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-md transition hover:bg-primary/90"
          >
            Login
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="flex min-h-[80vh] flex-col px-4">
      <PageHeader
        header={session.user?.name || ""}
        subheader={session.user?.email || ""}
      />

      <div className="mx-auto mt-3 flex w-full max-w-xs flex-col gap-3 pb-6">
        {session.user?.isAdmin && (
          <ButtonLink href="/admin" variant="outline">
            Admin
          </ButtonLink>
        )}
        <Button variant="primary" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
