import { Request, Response } from "express";
import { prisma } from "../../../common/utils/globals";

export const createTodo = async (req: Request, res: Response) => {
  const { title, description, completed, clientId } = req.body;
  if (!title || !clientId) {
    res.status(400).json({ error: "Title is required" });
  }
  try {
    const userId = getUserId(req);
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        completed,
        userId,
        clientId,
      },
    });
    res.status(200).json(newTodo);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error creating todo" });
  }
};

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const todos = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error getting todos" });
  }
};

const getUserId = (req: Request) => {
  const temp = req.headers.cookie || "";
  const cookies = temp.split(";");
  let userId = "";
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const [key, value] = cookie.split("=");
    if (key.trim() === "userId") {
      userId = value;
    }
  }
  return userId;
};
