import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";

import studentRoutes from "./routes/students.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.static(path.resolve("src", "uploads")));

app.use(cookieParser());

app.use(authRoutes);
app.use(studentRoutes);
app.use(usersRoutes);

app.use(notFoundHandler); //обробка помилки 404 в папці middlewares
app.use(errorHandler); //обробка помилки 500 в папці middlewares

export default app;
