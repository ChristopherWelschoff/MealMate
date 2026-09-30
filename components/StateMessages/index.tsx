import { AlertCircle, Loader2 } from "lucide-react";

function AlertDestructive() {
  return (
    <div
      role="alert"
      className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle
          size={24}
          className="text-destructive"
          aria-hidden="true"
        />
      </div>

      <h2 className="text-lg font-semibold text-foreground">
        Couldn&apos;t load recipes
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Please check your connection and try again.
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-md transition hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}

function Spinner({ className = "", ...props }: React.ComponentProps<"svg">) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Loader2
        role="status"
        aria-label="Loading"
        className={`size-8 animate-spin text-primary ${className}`}
        {...props}
      />
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Loading recipes
      </p>
    </div>
  );
}

export { AlertDestructive, Spinner };
