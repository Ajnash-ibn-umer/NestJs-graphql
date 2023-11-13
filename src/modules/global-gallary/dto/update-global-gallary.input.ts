import { CreateGlobalGallaryInput } from './create-global-gallary.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGlobalGallaryInput extends PartialType(CreateGlobalGallaryInput) {
  @Field(() => Int)
  id: number;
}
