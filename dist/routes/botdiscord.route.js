"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const botdiscord_controller_1 = require("../controllers/botdiscord.controller");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/bot-discord/", botdiscord_controller_1.botDiscord);
