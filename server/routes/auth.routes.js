import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  isAuthenticated,
  verifyEmail,
  sendResetOtp,
  resetPassword,
  verifyUser,
} from "../controller/auth.controller.js";

import userAuth from "../middleware/user.auth.js";
import verifyUserCookie from "./../middleware/verifyUser.auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.get("/verify-user", verifyUserCookie, verifyUser);

export default authRouter;
