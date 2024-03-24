import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import chalk from "chalk";
import jwt from "jsonwebtoken";

import cors from "cors";
import express from "express";
import morgan from "morgan";
import connectDB from "./DB/connection.js";
import authRouter from "./src/modules/auth/auth.router.js";
import userRouter from "./src/modules/user/user.router.js";
import messageRouter from "./src/modules/message/message.router.js";
import projectRouter from "./src/modules/project/project.router.js";
import offerRouter from "./src/modules/offers/offer.router.js";
import { globalErrorHandling } from "./src/utils/errorHandling.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });


const port = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow credentials
}));
app.use(morgan("dev"));
app.use(express.json({}));
app.use(cookieParser());
// app.use((req, res, next) => {
// // const {cookie}=req.headers
// // console.log(req.headers.cookie)
// // function getCookie(name) {
// //     const match = cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
// //     return match ? match[2] : null;
// //   }
// //   console.log("good",getCookie('refreshToken'))
//   const { accessToken, refreshToken } = req.cookies;
//   console.log( "index",accessToken,refreshToken)
//   if (!accessToken && refreshToken) {
//     jwt.verify(refreshToken, process.env.TOKEN_SIGNATURE, (err, decoded) => {
//       if (err) {
//         return res.json({ valid: false, message: "Invalid Refresh Token" });
//       } else {
//         const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.TOKEN_SIGNATURE, { expiresIn: '1m' });
//         res.cookie("accessToken", newAccessToken, {
//           maxAge: 60 * 1000,
//           httpOnly: true,
//           sameSite: "strict",
//           secure: process.env.NODE_ENV !== "DEV",
//         });
//         console.log("new",newAccessToken)
//         req.cookies.accessToken = newAccessToken;
//       }
//     });
//   }
//   next();
// });
app.set("case sensitive routing", true);
app.use("/uploads", express.static("./src/uploads"));
app.use(`/auth`, authRouter);
app.use(`/user`, userRouter);
app.use(`/messages`, messageRouter);
app.use(`/project`, projectRouter);
app.use(`/offer`, offerRouter);
app.all("/", (req, res, next) => {
  res.status(500).send("hello in app");
});
app.all("*", (req, res, next) => {
  res.status(500).send("In-valid Routing Plz check url  or  method");
});

// Error Handling Middleware should be placed at the end of all middlewares
app.use(globalErrorHandling);

connectDB();
server.listen(port, () =>
  console.log(chalk.yellow(`Example app listening on port ${port}!`))
);
