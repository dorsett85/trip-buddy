import { UserBasic, LoginArgs, RegisterArgs } from "./User.types";

export default class User {
  public login(args: LoginArgs) {
    const { username, password, email } = args;
    return {
      email,
      password
    };
  }
  public register(args: RegisterArgs) {
    const { password, email} = args;
    return {
      email,
      password
    };
  }
}
