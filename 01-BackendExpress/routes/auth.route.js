import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { ExpressValidator, body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email", "Formato de Email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Minimo 4 caracteres").trim().isLength({ min: 4 }),
    body("password", "Formato de password incorrecto").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("No coinciden las contraseñas");
        }
        return value;
      }
    ),
  ],
  validationResultExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "Formato de Email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Minimo 4 caracteres").trim().isLength({ min: 4 }),
  ],
  validationResultExpress,
  login
);

export default router;
