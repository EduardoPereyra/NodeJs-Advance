import { CustomError, User } from "../../domain/index.js";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, password, roles } = object;

    if (!_id || !id)
      throw CustomError.badRequest("Invalid user object: missing id");

    if (!name)
      throw CustomError.badRequest("Invalid user object: missing name");

    if (!email)
      throw CustomError.badRequest("Invalid user object: missing email");

    if (!password)
      throw CustomError.badRequest("Invalid user object: missing password");

    if (!roles)
      throw CustomError.badRequest("Invalid user object: missing roles");

    return new User(_id || id, name, email, password, roles);
  }
}
