import { Request, Response } from "express";
import { getClientEmail } from "../../../common/data-fetchers/global";
import { prisma } from "../../../common/utils/db";
import { getUserId, setCookie } from "../../../common/utils/globals";

export const createTodo = async (req: Request, res: Response) => {
  const { title, description, completed } = req.body;
  if (!title) {
    res.status(400).json({ error: "Title is required" });
  }
  try {
    const userId = getUserId(req);
    const clientEmail = await getClientEmail(req.headers.authorization!);
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        completed,
        userId,
        clientEmail,
      },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        userId: true,
        createdAt: true,
      },
    });
    setCookie(res, userId);
    res.status(200).json(newTodo);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const clientEmail = await getClientEmail(req.headers.authorization!);
    console.log("user id", userId);
    const todos = await prisma.todo.findMany({
      where: {
        userId,
        clientEmail,
      },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        createdAt: true,
      },
    });
    setCookie(res, userId);
    res.status(200).json(todos);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
