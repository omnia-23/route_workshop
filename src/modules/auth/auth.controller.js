import { Router } from "express";
import * as userService from "./auth.service.js";

const router = Router();

router.post("/signup", userService.signup);
router.post("/login", userService.login);
router.patch("/confirmEmail", userService.confirmEmail);

export default router;
