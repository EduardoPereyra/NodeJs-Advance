import { Validators } from "../../../config/index.js";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;
    if (!name) return ["Name is required"];
    if (!email) return ["Email is required"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Password is required"];
    if (password.length < 6)
      return ["Password must be at least 6 characters long"];

    const registerUserDto = new RegisterUserDto(
      name,
      email.toLowerCase(),
      password,
    );
    return [, registerUserDto];
  }
}
