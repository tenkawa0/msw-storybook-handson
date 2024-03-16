import { useId } from "react";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Todo } from "@/types/todo";
import DeleteButton from "./DeleteButton";
import { Stats } from "fs";

type Props = {
  todo: Todo;
};

type Variables = {
  id: string;
  status: Todo["status"];
};

export default function TodoListItem({ todo }: Props) {
  const itemId = useId();
  const checked = todo.status === "done";

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id, status }: Variables) => {
      const data = await axios.patch(`/todos/${id}`, { status });
      return data;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["/todos"] });
      enqueueSnackbar(
        status === "done" ? "Todoを完了しました" : "Todoを未完了に戻しました",
        { variant: "success" },
      );
    },
    onError: () => {
      enqueueSnackbar("エラーが発生しました", { variant: "error" });
    },
  });

  return (
    <li
      role="listitem"
      aria-labelledby={itemId}
      className={clsx(
        ["flex", "flex-row", "justify-between", "items-center"],
        ["w-full"],
        ["m-0", "py-4", "px-0"],
      )}
    >
      <div className={clsx(["flex", "flex-row", "items-center", "gap-2"])}>
        <input
          type="checkbox"
          id="status"
          name="status"
          checked={checked}
          onChange={() =>
            mutate({ id: todo.id, status: checked ? "todo" : "done" })
          }
          disabled={isPending}
          className={clsx("disabled:opacity-disabled")}
        />
        <label
          id={itemId}
          htmlFor="status"
          className={clsx(checked && ["line-through", "text-disabled"])}
        >
          {todo.title}
        </label>
      </div>
      <DeleteButton todo={todo} />
    </li>
  );
}
