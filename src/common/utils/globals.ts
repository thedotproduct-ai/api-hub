import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const getUserId = (req: Request) => {
  const cookie = req.cookies;
  let userId = cookie["userId"];
  if (!userId || userId === "") {
    userId = uuidv4();
  }
  return userId;
};

// Set the cookies for 100 years
export const setCookie = (res: Response, userId: string) => {
  res.cookie("userId", userId, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 100 * 365 * 24 * 60 * 60 * 1000,
  });
};
