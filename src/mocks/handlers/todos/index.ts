import { defaultHander as getTodosHandler } from "./getTodos";
import { defaultHander as addTodoHandler } from "./addTodo";
import { defaultHander as deleteTodoHandler } from "./deleteTodo";
import { defaultHander as updateTodoStatusHandler } from "./updateTodoStatus";

export const handlers = {
  getTodos: getTodosHandler,
  addTodo: addTodoHandler,
  deleteTodo: deleteTodoHandler,
  updateTodoStatus: updateTodoStatusHandler,
};
