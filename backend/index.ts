import app from "./src/app";
import { connectDB } from "./src/config/database";
import { createServer } from "http";
import { initializeSocket } from "./src/utils/socket";

const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;
initializeSocket(httpServer);

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log("The server is up and listening on Port:", PORT);
    });
  })
  .catch((error) => {
    console.log("Failed to start server:", error);
    process.exit(1);
  });
