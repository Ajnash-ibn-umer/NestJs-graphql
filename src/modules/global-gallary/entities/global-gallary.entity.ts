import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GlobalGallary {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
