const session = require("express-session");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");

//библиотека для соранения сессий в базе
const MongoStore = require("connect-mongo");

require('dotenv').config()
const {secret, DEV} = process.env
console.log({secret, DEV});

const indexRouter = require("./routes/index");
const registrationRouter = require("./routes/registration");
const adminRouter = require("./routes/admin");
const constructorRouter = require("./routes/constructor");
const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile");
// const {urlMongo} = require("./bin/www");
// const contructorRouter = require("./routes/constructor")  //  Добавил

const app = express();

// view engine setup
app.set("views", path.join(process.env.PWD, "views"));
app.set("view engine", "hbs");
app.use(
  session({
    secret: "foo",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin:admin@cluster0.pbna6.mongodb.net/Pohudei?retryWrites=true&w=majority",
    }),
  })
);
app.use((req, res, next) => {
  res.locals.email = req.session.email;
  res.locals.admin = req.session.admin;

  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use("/", indexRouter);
app.use("/registration", registrationRouter);
app.use("/admin", adminRouter);
app.use("/constructor", constructorRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
//session
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
