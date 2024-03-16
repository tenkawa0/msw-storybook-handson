import clsx from "clsx";

import { Todo } from "@/types/todo";

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
  return (
    <li className={clsx(["flex", "flex-row "], ["w-full"])}>
      <div className={clsx(["flex", "flex-row", "gap-x-2"])}>
        <input
          type="checkbox"
          id="status"
          name="status"
          checked={todo.status === "done"}
          onChange={() =>
            handleChangeStatus({
              ...todo,
              status: todo.status === "done" ? "todo" : "done",
            })
          }
        />
        <label htmlFor="status">{todo.title}</label>
      </div>
    </li>
  );
}
