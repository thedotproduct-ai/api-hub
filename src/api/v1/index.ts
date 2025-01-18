import express from "express";
import authRoutes from "../../modules/auth/routes";
import todoRoutes from "../../modules/todoapp/routes";

const app = express();
app.use("/todo", todoRoutes);
app.use("/auth", authRoutes);

export default app;
