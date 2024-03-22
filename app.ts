import express from "express";
import { router as index } from "./api/index";
import { router as trip } from "./api/trip";
import { router as upload } from "./api/upload";
import bodyParser from "body-parser";
import cors from "cors";

export const app = express();

// กำหนด CORS ก่อนกำหนดเส้นทาง
app.use(cors({
  origin: "*",
}));

// กำหนด body parsers
app.use(bodyParser.text());
app.use(bodyParser.json());

// กำหนดเส้นทาง
app.use("/", index);
app.use("/trip", trip);
app.use("/upload", upload);
app.use("/uploads", express.static("uploads"));
