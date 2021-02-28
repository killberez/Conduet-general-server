import express from "express";
import mongoose from "mongoose";
import projectRouter from "./routes/project/Project.route";
import userRouter from "./routes/user/User.route";
import authRouter from "./routes/Auth";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import authMiddleware from "./middlewares/auth";
import * as dotenv from "dotenv";

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECT_LINK as string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((err: Error) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
  });

app.set("port", 8000 || process.env.PORT);

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());

app.use("/auth", authRouter);

app.use("/api", authMiddleware);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/user", userRouter);

export default app;
