import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import apiV1 from "./api/v1";

dotenv.config();
const app = express();

// Middleware to parse JSON & Cookies
app.use(bodyParser.json());
app.use(cookieParser());

// API Version 1
app.use("/api/v1", apiV1);

// Added this for testing purpose
// app.use("/api/v2", apiV2);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
