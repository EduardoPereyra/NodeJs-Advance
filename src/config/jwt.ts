import jwt from "jsonwebtoken";
import { envs } from "./index.js";

const JWT_SECRET = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: number = 1000 * 60 * 60 * 24, // 1 day
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if (err) resolve(null);

        resolve(token!);
      });
    });
  }

  static async verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
