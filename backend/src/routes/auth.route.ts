import express from "express";
import {
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerHandler,
  verifyEmailHandler,
} from "../controllers/auth.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createUserSchema,
  loginUserSchema,
  verifyEmailSchema,
} from "../schema/user.schema";

const router = express.Router();

// Register user route
router.post("/register", validate(createUserSchema), registerHandler);

// Verify verification code
router.get(
  "/verifyemail/:verificationCode",
  validate(verifyEmailSchema),
  verifyEmailHandler
);

// Login user route
router.post("/login", validate(loginUserSchema), loginHandler);

// Refresh access toke route
router.get("/refresh", refreshAccessTokenHandler);

router.use(deserializeUser, requireUser);

// Logout User
router.get("/logout", logoutHandler);

export default router;
