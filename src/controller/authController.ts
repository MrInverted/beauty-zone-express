import express from "express";
import * as auth from "./auth/index.ts";

const authRouter = express.Router();

authRouter.post("/register", auth.register);
authRouter.post("/login", auth.login);
authRouter.post("/verify", auth.verify);
authRouter.post("/recovery", auth.recovery);
authRouter.patch("/recovery-password", auth.recoveryChangePassword);

export { authRouter }
