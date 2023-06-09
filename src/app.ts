import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes";
import * as http from "http";
import * as https from "https";
import { updateTasaNear } from "./services/tasa.service";
import AppDataSource from "./config/data.source";
const fs = require("fs");

AppDataSource.initialize().then(() => console.log("Conexion ORM Ready"));

const PORT = Number(process.env.PORT) || 3000;
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

const startUpdateTasa = () => {
  updateTasaNear();
  setInterval(async () => {
    updateTasaNear();
  }, 900000);
};

// startAutoSwap();
startUpdateTasa();
