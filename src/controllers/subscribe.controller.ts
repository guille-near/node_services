import { Request, Response } from "express";
import { Subscribe } from "../entities/subscribe.entity";

async function setEmailSubscribe(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const emailSubscribe = await Subscribe.findOneBy({ email: email });

    if (emailSubscribe) return res.status(400).send();

    const subs = new Subscribe();
    subs.email = email;
    const saved = await subs.save();

    if (saved) return res.status(204).send();

    return res.status(400).send();
  } catch (error) {
    return res.status(500).send();
  }
}

async function getEmailSubscribe(req: Request, res: Response) {
  try {
    const emailSubscribes = await Subscribe.find();

    return res.send(emailSubscribes);
  } catch (error) {
    return res.status(500).send();
  }
}

export default { setEmailSubscribe, getEmailSubscribe };
