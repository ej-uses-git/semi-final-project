const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const todosRouter = require("./routes/todos");
const commentsRouter = require("./routes/comments");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/todos", todosRouter);
app.use("/api/comments", commentsRouter);

module.exports = app;
