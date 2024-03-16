"use client";
import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/20/solid";

import { Todo } from "@/types/todo";
import { useState } from "react";

type Props = {
  handleAdd: (todo: Todo) => void;
};

export default function AddTodoForm({ handleAdd }: Props) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAdd({
          id: new Date().toString(),
          title: value,
          status: "todo",
        });
        setValue("");
      }}
    >
      <div className={clsx("flex", "flex-row", "gap-2")}>
        <input
          type="text"
          name="todo"
          className={clsx(
            ["block", "w-full"],
            ["rounded", "border-0", "ring-1", "ring-inset", "ring-gray-300"],
            ["focus:ring-2", "focus:ring-inset", "focus:ring-indigo-600"],
            "placeholder:text-gray-400",
          )}
          placeholder="Todo..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className={clsx(
            ["inline-flex", "items-center", "flex-shrink-0"],
            "rounded",
            "bg-indigo-600",
            ["px-3", "py-2"],
            ["text-sm", "text-white"],
            "shadow-sm",
            "hover:bg-indigo-500",
            [
              "focus-visible:outline",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-indigo-600",
            ],
            ["disabled:bg-disabled", "disabled:text-disabled"],
          )}
          disabled={!value}
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          追加
        </button>
      </div>
    </form>
  );
}
