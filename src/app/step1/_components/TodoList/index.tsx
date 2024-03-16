import clsx from "clsx";

import { Todo } from "@/types/todo";
import Center from "@/components/Center";
import Fade from "@/components/Fade";
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
  const hasTodos = todos.length > 0;

  return (
    <div className={clsx("p-6", "bg-background-paper", "rounded")}>
      <Fade show={hasTodos}>
        <ul role="list" className="divide-y divide-gray-100">
          {todos.map((item) => (
            <TodoListItem
              key={item.id}
              todo={item}
              handleChangeStatus={handleChangeStatus}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </Fade>
      <Fade show={!hasTodos}>
        <Center>
          <p className={clsx("prose-sm", "text-disabled")}>
            Todoが登録されていません
          </p>
        </Center>
      </Fade>
    </div>
  );
}
