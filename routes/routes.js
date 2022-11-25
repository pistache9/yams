import express from "express";
const router = express.Router();

import { getHome, postHome } from "../controllers/home.js";
import { postLogin, getLogin } from "../controllers/logingIn.js";
import { getDashboard } from "../controllers/dashboard.js";
import GameController from "../controllers/game.js";
import GainController from "../controllers/gain.js";
import authGuard from "../middlewares/authGuard.js";

router.get("/", getHome);
router.post("/", postHome);

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/dashboard", authGuard, getDashboard);

router.post("/game", GameController);
router.get("/game", authGuard, GameController);

router.post("/getGain", authGuard, GainController);

export default router;
