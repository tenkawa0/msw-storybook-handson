import { http, delay, HttpResponse } from "msw";

const endpoint = "/todos/:id";

export type Response = null;

export const defaultHander = http.delete(endpoint, async () => {
  await delay("real");

  return HttpResponse.json<Response>(null, { status: 200 });
});

export const errorHandler = http.delete(endpoint, async () => {
  await delay("real");

  return HttpResponse.json({ message: "Error" }, { status: 500 });
});
