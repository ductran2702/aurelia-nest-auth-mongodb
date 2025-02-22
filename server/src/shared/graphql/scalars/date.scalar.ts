import type { CustomScalar } from '@nestjs/graphql';
import { Scalar } from '@nestjs/graphql';
import type { ValueNode } from 'graphql';
import { Kind } from 'graphql';

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date): number {
    return value.getTime(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date | null{
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    return null;
  }
}
