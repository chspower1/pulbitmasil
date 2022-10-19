import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { userRouter } from "./routers/users";
import { reviewRouter } from "./routers/review";
import { authRouter } from "./routers/auth";
import { dodreamRouter } from "./routers/dodream";
import { greencrewRouter } from "./routers/greencrew";
import { errorMiddleware } from "./middlewares/error_middleware";

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/review", reviewRouter);
app.use("/dodream", dodreamRouter);
app.use("/greencrew", greencrewRouter);

app.use(errorMiddleware);
app.use(function (req, res, next) {
  next(createError(404));
});

export { app };
