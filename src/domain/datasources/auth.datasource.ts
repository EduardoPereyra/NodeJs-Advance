import type { LoginUserDto, RegisterUserDto, User } from "../index.js";

export abstract class AuthDataSource {
  abstract login(loginUserDTO: LoginUserDto): Promise<User>;
  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
}
