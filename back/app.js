import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { userRouter } from "./src/routers/users";
import { trashRouter } from "./src/routers/trash";
import { reviewRouter } from "./src/routers/review";
import { authRouter } from "./src/routers/auth";
import { dodreamRouter } from "./src/routers/dodream";
import { greencrewRouter } from "./src/routers/greencrew";
import { errorMiddleware } from "./src/middlewares/error_middleware";

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use("/user", userRouter);
app.use("/trash", trashRouter);
app.use("/auth", authRouter);
app.use("/review", reviewRouter);
app.use("/dodream", dodreamRouter);
app.use("/greencrew", greencrewRouter);

app.use(errorMiddleware);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
