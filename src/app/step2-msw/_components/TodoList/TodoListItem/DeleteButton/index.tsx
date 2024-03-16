import clsx from "clsx";
import { useSnackbar } from "notistack";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
};

type Variables = {
  id: string;
};

export default function DeleteButton({ todo }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id }: Variables) => axios.delete(`/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/todos"] });
      enqueueSnackbar("Todoを削除しました", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("エラーが発生しました", { variant: "error" });
    },
  });

  return (
    <button
      type="button"
      aria-label="Todoを削除する"
      className={clsx(
        "rounded-full",
        "p-2",
        "text-active",
        "hover:bg-hover",
        ["focus:outline-none", "focus:ring-2", "focus:ring-indigo-600"],
        ["disabled:opacity-disabled"],
      )}
      onClick={() => mutate({ id: todo.id })}
      disabled={isPending}
    >
      <TrashIcon className="size-5" aria-hidden="true" />
    </button>
  );
}
