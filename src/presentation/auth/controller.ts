import type { Request, Response } from "express";
import {
  RegisterUserDto,
  AuthRepository,
  CustomError,
  RegisterUser,
  LoginUserDto,
  LoginUser,
} from "../../domain/index.js";
import { UserModel } from "../../data/mongodb/index.js";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((err) => this.handleError(err, res));
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => res.json({ users, user: req.body.user }))
      .catch((err) => this.handleError(err, res));
  };
}
