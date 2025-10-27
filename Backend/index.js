import express from "express";
import mongoose from "mongoose";

import "dotenv/config";
import { UserRouter } from "./Routes/userRoute.js";
import { Products } from "./Routes/product.js";
import Connectdb from "./Config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./server/Server.js";

const app = express();
const port = process.env.PORT || 4000;

Connectdb();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_urllocal
];
const localhostRegex = /^(http:\/\/localhost:\d+)$/;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
      return callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/app/details", UserRouter);
app.use("/app/detail", Products);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
