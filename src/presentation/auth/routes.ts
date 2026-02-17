import { Router } from "express";
import { AuthController } from "./controller.js";
import {
  AuthDataSourceImpl,
  AuthRepositoryImpl,
} from "../../infrastructure/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const database = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(database);

    const authController = new AuthController(authRepository);

    router.post("/login", authController.loginUser);
    router.post("/register", authController.registerUser);

    router.get("/", [AuthMiddleware.validateJWT], authController.getUsers);

    return router;
  }
}
