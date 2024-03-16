import { http, delay, HttpResponse } from "msw";

import { Todo } from "@/types/todo";

const endpoint = "/todos";

export type Response = Todo;

export const defaultHander = http.post(endpoint, async () => {
  await delay("real");

  return HttpResponse.json<Response>(
    {
      id: "todo-1",
      title: "モックデータ",
      status: "todo",
    },
    { status: 201 },
  );
});

export const errorHandler = http.post(endpoint, async () => {
  await delay("real");

  return HttpResponse.json({ message: "Error" }, { status: 500 });
});
