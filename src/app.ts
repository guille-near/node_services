import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes";
import * as http from "http";
import * as https from "https";
const fs = require("fs");

const PORT = Number(process.env.POST) || 3000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", router);

let server;

if (process.env.NODE_ENV === "production") {
  const privateKey = fs.readFileSync("/etc/letsencrypt/live/defix3.com/privkey.pem", "utf8");
  const certificate = fs.readFileSync("/etc/letsencrypt/live/defix3.com/cert.pem", "utf8");
  const ca = fs.readFileSync("/etc/letsencrypt/live/defix3.com/chain.pem", "utf8");

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
  server = https.createServer(credentials, app);
  console.log("https");
} else {
  server = http.createServer(app);
  console.log("http");
}

server.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));
