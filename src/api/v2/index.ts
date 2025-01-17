import express from "express";
import todoRoutes from "../../modules/todoapp/routes";

const app = express();
app.use("/todo", todoRoutes);

export default app;
