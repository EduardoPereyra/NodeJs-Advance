import { Validators } from "../../../config/index.js";

export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;
    if (!email) return ["Email is required"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Password is required"];

    const loginUserDto = new LoginUserDto(email.toLowerCase(), password);
    return [, loginUserDto];
  }
}
