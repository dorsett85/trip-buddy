import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { ContextDeps } from './context.types';
import { getToken } from "../utils/getToken";

export const getContext = (dependencies: ContextDeps) => ({ req }: ExpressContext) => {
  const { UserService } = dependencies;
  const us = new UserService();

  // Verifify user
  const token = getToken(req.headers.authorization);
  const user = token && us.verify(token);
  console.log(user);
  return {
    UserService: us,
    user
  };
};
