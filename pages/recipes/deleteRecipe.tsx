import { useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { mutate } from "swr";

export default function DeleteRecipe() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { id } = router.query;

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  async function handleDelete() {
    try {
      const response = await fetch(`/api/recipe/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Something went wrong");
        return;
      }

      closeDialog();
      await mutate("/api/recipes");
      await router.push("/landingPage");
      toast.success("Recipe successfully deleted");
    } catch {
      toast.error("Network error – please try again");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        aria-label="Delete recipe"
        className="cursor-pointer rounded-full p-1.5 text-primary transition hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 size={20} />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="delete-title"
        className="m-auto w-[90%] max-w-xs rounded-2xl bg-card p-6 text-center shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <Trash2 size={22} className="text-destructive" aria-hidden="true" />
        </div>

        <h2 id="delete-title" className="text-lg font-semibold text-foreground">
          Delete recipe?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This can&apos;t be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 rounded-full bg-destructive px-4 py-2.5 text-sm font-medium text-white transition hover:bg-destructive/90"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={closeDialog}
            className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
}
