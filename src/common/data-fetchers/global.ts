import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../utils/db";

export const getClientEmail = async (token: string) => {
  const payload = jwt.decode(token);
  if (!payload) {
    throw new Error("Invalid token");
  }
  const payloadEmail = (payload as JwtPayload).email;
  const client = await prisma.client.findUnique({
    where: {
      email: payloadEmail,
      apiKey: token,
    },
  });
  if (!client) {
    throw new Error("Token is expired or invalid");
  }
  return client.email;
};
