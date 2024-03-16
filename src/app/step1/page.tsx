"use client";
import { useState } from "react";
import clsx from "clsx";

import TodoList from "./_components/TodoList";
import { Todo } from "@/types/todo";
import AddTodoForm from "./_components/AddTodoForm";

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <main className={clsx(["w-screen"])}>
      <div className={clsx(["container", "p-8", "max-w-screen-sm"])}>
        <div className={clsx(["flex", "flex-col", "gap-4"])}>
          <h1>Todo List</h1>
          <div className={clsx(["flex", "flex-col", "gap-2"])}>
            <AddTodoForm
              handleAdd={(todo) => {
                alert("eniseni");
                setTodos((prev) => [todo, ...prev]);
              }}
            />
            <TodoList
              todos={todos}
              handleChangeStatus={(todo) => {
                setTodos((prev) =>
                  prev.map((item) => (item.id === todo.id ? todo : item)),
                );
              }}
              handleDelete={(todo) => {
                setTodos((prev) => prev.filter((item) => item.id !== todo.id));
              }}
            />
          </div>
          <p>
            StorybookのPlay
            functionの使い方を理解し、Todoの表示・追加・削除のテストを実装しましょう
          </p>
        </div>
      </div>
    </main>
  );
}
