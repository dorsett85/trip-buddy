import UserService from '../../services/User';

export interface UserResolversDeps {
  UserService: typeof UserService
}