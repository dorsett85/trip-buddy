import { isAuthenticated } from './isAuthenticated';
import { ContextFieldResolver } from '../types/resolvers';
import { AUTHENTICATED_ERROR_MESSAGE } from './constants/errors';

const source: any = {};
const args: any = {};
let context: any = {};
const info: any = {};
const resolver: ContextFieldResolver = (_, __, { user }) => user;

afterEach(() => {
  context = {};
})

describe('isAuthenticated function', () => {

  it('should have been called without error', () => {
    context.user = {};
    const authenticatedResolver = isAuthenticated(resolver)(source, args, context, info);
    expect(authenticatedResolver).toStrictEqual(context.user);
  })

  it('should throw an error', () => {
    const authenticatedResolver = () => isAuthenticated(resolver)(source, args, context, info);
    expect(authenticatedResolver).toThrowError(AUTHENTICATED_ERROR_MESSAGE);
  })
})