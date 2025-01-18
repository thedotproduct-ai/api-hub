import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../common/utils/db";

export const generateToken = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email is required" });
  }
  try {
    const user = await prisma.client.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).json({ error: "Invalid user email" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET!);
    await prisma.client.update({
      where: {
        email,
      },
      data: {
        apiKey: token,
        previousKeys: [...(user?.previousKeys || []), token],
      },
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error generating token" });
  }
};

// TODO: Send the relevant data only for the client later
export const getMetadata = async (req: Request, res: Response) => {
  const token = req.headers.authorization!;
  if (!token) {
    res.status(400).json({ error: "Token is required" });
  }
  const payload = jwt.decode(token);
  const clientEmail = (payload as JwtPayload)?.email;
  if (!payload || !clientEmail) {
    res.status(400).json({ error: "Invalid token" });
  }
  try {
    const user = await prisma.client.findUnique({
      where: { email: clientEmail },
      select: {
        name: true,
        email: true,
        todos: true,
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error getting metadata" });
  }
};

// TODO: Temporary route, client will be added using google auth later in nextjs project
export const addClient = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).json({ error: "Name andemail are required" });
  }
  try {
    const client = await prisma.client.create({
      data: {
        name,
        email,
      },
    });
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json({ error: "Error adding client" });
  }
};
