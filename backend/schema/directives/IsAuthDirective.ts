import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { ContextObj } from '../types/contextObj';
import { AUTHENTICATED_ERROR_MESSAGE } from '../../utils/constants/errors';

export class IsAuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(
    field: GraphQLField<any, any>
  ): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args: any) => {
      const { user } = args[2] as ContextObj; // 3rd item in the array is the context;
      if (!user) {
        throw new AuthenticationError(AUTHENTICATED_ERROR_MESSAGE);
      }
      const result = await resolve.apply(this, args);
      return result;
    };
  }
}
