import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGlobalGallaryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
