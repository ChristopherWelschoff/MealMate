import { useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";
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
      <button type="button" onClick={openDialog} aria-label="delete-recipe">
        <Trash className="stroke-gray-500 hover:fill-green-900 hover:stroke-black" />
      </button>

      <dialog
        ref={dialogRef}
        className="m-auto rounded-lg p-6 backdrop:bg-black/50"
      >
        <p className="mb-4 font-semibold">
          Are you sure you want to delete this recipe?
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleDelete}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={closeDialog}
            className="rounded px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
}
