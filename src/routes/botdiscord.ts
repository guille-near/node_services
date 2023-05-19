import { Request, Response, Router } from "express";
import { botDiscord } from "../controllers/botdiscord.controller";

const router = Router();

router.post("/bot-discord/", botDiscord);

export { router };
