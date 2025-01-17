import { Request, Response } from "express";
import { prisma } from "../../../common/utils/globals";

export const createTodo = async (req: Request, res: Response) => {
  const { title, description, done } = req.body;
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        done,
      },
    });
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Error creating todo" });
  }
};

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error getting todos" });
  }
};
