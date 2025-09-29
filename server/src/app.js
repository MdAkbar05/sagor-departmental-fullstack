const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const xssClean = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const ratelimit = require("express-rate-limit");
const userRouter = require("./routes/user.router");
const seedRouter = require("./routes/seedRouter");
const createError = require("http-errors");
const { errorResponse } = require("./controllers/responseController");
const authRouter = require("./routes/authRouter");
const categoryRouter = require("./routes/categoryRouter");
const productsRouter = require("./routes/productsRouter");
const orderRouter = require("./routes/orderRouter");
const reviewRouter = require("./routes/reviewRouter");

const app = express();
app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  next();
});
app.use(cookieParser());

app.use("/api/users/", userRouter);
app.use("/api/auth/", authRouter);
app.use("/api/seed/", seedRouter);
app.use("/api/categories/", categoryRouter);
app.use("/api/products/", productsRouter);
app.use("/api/reviews/", reviewRouter);
app.use("/api/orders/", orderRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to server",
  });
});

//Client Error handling
app.use((req, res, next) => {
  next(createError(404, "Routes not found"));
});

//Server Error handling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

// const rateLimiter = ratelimit({
//   windowMs: 1 * 60 * 1000, // 1 minitue
//   max: 5,
//   message: "Too many request from this IP ! Please try again later ",
// });

module.exports = app;
