import clsx from "clsx";

import { Todo } from "@/types/todo";
import Center from "@/components/Center";
import TodoListItem from "./TodoListItem";

type Props = {
  todos: Todo[];
  handleChangeStatus: (item: Todo) => void;
  handleDelete: (item: Todo) => void;
};

export default function TodoList({
  todos,
  handleChangeStatus,
  handleDelete,
}: Props) {
  const hasTodo = todos.length > 0;

  return (
    <div className={clsx("p-6", "bg-background-paper", "rounded")}>
      <ul
        role="list"
        className={clsx("divide-y", "divide-gray-300", "m-0", "p-0")}
      >
        {hasTodo ? (
          todos.map((item) => (
            <TodoListItem
              key={item.id}
              todo={item}
              handleChangeStatus={handleChangeStatus}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <Center>
            <p className={clsx("prose-sm", "text-disabled")}>
              Todoが登録されていません
            </p>
          </Center>
        )}
      </ul>
    </div>
  );
}
