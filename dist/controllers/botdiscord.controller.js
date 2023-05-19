"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.botDiscord = void 0;
const botdiscord_service_1 = require("../services/botdiscord.service");
function botDiscord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { wallet } = req.body;
            if (!wallet)
                return res.status(400).send({ message: "Invalid data." });
            const result = yield (0, botdiscord_service_1.botDiscordService)(wallet);
            res.send(result);
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    });
}
exports.botDiscord = botDiscord;
