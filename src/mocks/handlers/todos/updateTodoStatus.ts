import { http, delay, HttpResponse } from "msw";

import { Todo } from "@/types/todo";

const endpoint = "/todos/:id";

export type Response = Todo;

export const defaultHander = http.patch(endpoint, async () => {
  await delay("real");

  return HttpResponse.json<Response>(
    {
      id: "todo-1",
      title: "モックデータ",
      status: "done",
    },
    { status: 200 },
  );
});

export const errorHandler = http.patch(endpoint, async () => {
  await delay("real");

  return HttpResponse.json({ message: "Error" }, { status: 500 });
});
