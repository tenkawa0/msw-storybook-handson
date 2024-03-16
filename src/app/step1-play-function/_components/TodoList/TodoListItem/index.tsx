import clsx from "clsx";

import { Todo } from "@/types/todo";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useId } from "react";

type Props = {
  todo: Todo;
  handleChangeStatus: (item: Todo) => void;
  handleDelete: (item: Todo) => void;
};

export default function TodoListItem({
  todo,
  handleChangeStatus,
  handleDelete,
}: Props) {
  const itemId = useId();
  const checked = todo.status === "done";

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
            handleChangeStatus({
              ...todo,
              status: todo.status === "done" ? "todo" : "done",
            })
          }
        />
        <label
          id={itemId}
          htmlFor="status"
          className={clsx(checked && ["line-through", "text-disabled"])}
        >
          {todo.title}
        </label>
      </div>
      <button
        type="button"
        aria-label="Todoを削除する"
        className={clsx(
          "rounded-full",
          "p-2",
          "text-active",
          "hover:bg-hover",
          ["focus:outline-none", "focus:ring-2", "focus:ring-indigo-600"],
        )}
        onClick={() => handleDelete(todo)}
      >
        <TrashIcon className="size-5" aria-hidden="true" />
      </button>
    </li>
  );
}
