import { http, delay, HttpResponse } from "msw";

import { Todo } from "@/types/todo";

const endpoint = "/todos";

export type Response = Todo[];

export const defaultHander = http.get(endpoint, async () => {
  await delay("real");

  return HttpResponse.json<Response>([
    {
      id: "todo-1",
      title: "モックデータ",
      status: "todo",
    },
    {
      id: "todo-2",
      title: "モックデータその2",
      status: "todo",
    },
    {
      id: "todo-3",
      title: "モックデータその3",
      status: "done",
    },
  ]);
});

export const errorHandler = http.get(endpoint, async () => {
  await delay("real");

  return HttpResponse.json({ message: "Error" }, { status: 500 });
});
