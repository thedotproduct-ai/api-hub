import express from "express";
import { createTodo, getAllTodos } from "../controllers";
const app = express();

app.get("/get-all", getAllTodos);
app.post("/create", createTodo);

export default app;
