import { config } from "dotenv";
import express from "express";
import { databaseConnection } from "./data/data.js";
import routes from "./router/user.routes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
config({ path: ".env" });
databaseConnection();

const server = express();
server.use(cookieParser());
server.use(express.json());

server.use("/api/user", routes);

server.use(errorMiddleware);
server.listen(process.env.PORT, () => {
  console.log(`Server is working on ${process.env.PORT}`);
});
