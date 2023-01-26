import { Scalar, CustomScalar } from '@nestjs/graphql';
import { GraphQLError, Kind, ValueNode } from 'graphql';

@Scalar('EmailAddressScalar')
export class EmailAddressScalar implements CustomScalar<string, string> {
  description = 'Email custom scalar type';
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  private validateEmail(value: string): string {
    if (!this.EMAIL_REGEX.test(value)) {
        throw new GraphQLError("Value is not a valid email address");
    }
    return value;
  }

  parseValue(value: string): string {
    return this.validateEmail(value);
  }

  serialize(value: string): string {
    return this.validateEmail(value);
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.INT) {
      return this.validateEmail(ast.value);
    }
    return null;
  }
}