var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var usersRouter = require("./src/routers/users");
var trashRouter = require("./src/routers/trash");
var authRouter = require("./src/routers/auth");
var reviewRouter = require("./src/routers/review");
var dodreamRouter = require("./src/routers/dodream");
var greencrewRouter = require("./src/routers/greencrew");

const maria = require("./src/db/connect/maria");
const errorMiddleware = require("./src/middlewares/error_middleware");
const updatecrew = require("./src/db/connect/interval");

const app = express();

app.use(cors());

maria.connect();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use("/user", usersRouter);
app.use("/trash", trashRouter);
app.use("/auth", authRouter);
app.use("/review", reviewRouter);
app.use("/dodream", dodreamRouter);
app.use("/greencrew", greencrewRouter);

app.use(errorMiddleware);
updatecrew();
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
