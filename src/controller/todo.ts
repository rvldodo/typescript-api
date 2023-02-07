import { RequestHandler } from "express";
import { Todo } from "../model/todo";
import { v4 as uuid } from "uuid";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const { text } = req.body as { text: string };
  const newTodo = new Todo(uuid(), text);

  TODOS.push(newTodo);

  res.json({ message: "Todo successfully created", todo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body as { text: string };

  const todoIndex = TODOS.findIndex((index) => index.id === id);

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, text);

  res.json({ message: "Todo updated" });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params;

  const todoIndex = TODOS.findIndex((index) => index.id === id);

  TODOS.splice(todoIndex, 1);

  res.json({ message: "Todo deleted" });
};
