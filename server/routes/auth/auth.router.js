/**
 * Title: routes/auth/auth.router.js
 * Author: Nathaniel Liebhart
 * Description NodeBucket API
 */
import { Router } from "express";
import { AuthController } from "../../controllers";
import { AsyncWrapper } from "../../utils";

const router = Router();
const authController = new AuthController();

/**
 * [POST] /auth/sign-up
 */
router.post(
  "/register",
  AsyncWrapper(authController.signUp.bind(authController))
);

/**
 * [POST] /auth/sign-in
 */
router.post(
  "/login",
  AsyncWrapper(authController.signIn.bind(authController))
);

export const authRouter = {
  baseUrl: "/auth",
  router
};
