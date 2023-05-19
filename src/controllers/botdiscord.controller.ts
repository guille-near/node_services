import { Request, Response } from "express";
import { botDiscordService } from "../services/botdiscord.service";

async function botDiscord(req: Request, res: Response) {
  try {
    const { wallet, discordId } = req.body;

    if (!wallet || !discordId) return res.status(400).send({ message: "Invalid data." });

    const result = await botDiscordService(wallet, discordId);

    res.send(result);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
}

export { botDiscord };
