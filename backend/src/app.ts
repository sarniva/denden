import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";

import authRoutes from "./routes/authRoutes.ts";
import messageRoutes from "./routes/messageRoutes.ts";
import chatRoutes from "./routes/chatRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "The server is up and running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../..web/dist")));

  app.get("/{*any}", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
  });
}

export default app;
