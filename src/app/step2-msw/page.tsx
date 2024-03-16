import clsx from "clsx";

import TodoList from "./_components/TodoList";
import AddTodoForm from "./_components/AddTodoForm";

export default function Page() {
  return (
    <main className={clsx(["w-screen"])}>
      <div className={clsx(["container", "p-8", "max-w-screen-sm"])}>
        <div className={clsx(["flex", "flex-col"])}>
          <h1>Todo List</h1>
          <div className={clsx(["flex", "flex-col", "gap-2"])}>
            <AddTodoForm />
            <TodoList />
          </div>
          <p>MSWの使い方を理解し、正常時・エラー時のテストを実装しましょう</p>
        </div>
      </div>
    </main>
  );
}
