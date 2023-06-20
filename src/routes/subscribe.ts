import { Request, Response, Router } from "express";
import subscribeController from "../controllers/subscribe.controller";

const router = Router();

router.post("/set-email-subscribe/", subscribeController.setEmailSubscribe);

router.get("/get-email-subscribe", subscribeController.getEmailSubscribe);

export { router };
