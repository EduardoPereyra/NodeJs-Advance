import { BCryptAdapter } from "../../config/index.js";
import { UserModel } from "../../data/mongodb/index.js";
import {
  AuthDataSource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  User,
} from "../../domain/index.js";
import { UserMapper } from "../index.js";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashedPassword: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BCryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BCryptAdapter.compare,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.notFound("User not found");

      const isPasswordValid = this.comparePassword(password, user.password);
      if (!isPasswordValid)
        throw CustomError.unauthorized("Invalid credentials");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internal();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password } = registerUserDto;

    try {
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest("Email already exists");

      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internal();
    }
  }
}
