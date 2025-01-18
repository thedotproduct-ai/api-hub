import express from "express";
import { addClient, generateToken, getMetadata } from "../controllers";
const app = express();

app.post("/add-client", addClient);
app.post("/generate-token", generateToken);
app.get("/get-metadata", getMetadata);

export default app;
