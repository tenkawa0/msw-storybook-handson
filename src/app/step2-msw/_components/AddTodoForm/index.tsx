"use client";
import clsx from "clsx";
import { PlusIcon } from "@heroicons/react/20/solid";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "notistack";

type Variables = {
  title: string;
};

export default function AddTodoForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ title }: Variables) => {
      const { data } = await axios.post("/todos", { title });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/todos"] });
      enqueueSnackbar("Todoを追加しました", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("エラーが発生しました", { variant: "error" });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ title: value });
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
            ["inline-flex", "justify-center", "items-center", "flex-shrink-0"],
            "rounded",
            "bg-indigo-600",
            ["w-[80px]", "py-2"],
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
          disabled={!value || isPending}
        >
          {isPending ? (
            "追加中..."
          ) : (
            <>
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              追加
            </>
          )}
        </button>
      </div>
    </form>
  );
}
