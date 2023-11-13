import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Blog } from 'src/models.graphql';

@InputType()
export class addBlogDTO {
  @Field()
  _name: string;

  @Field()
  _description: string;

  @Field()
  _content: string;
}

@InputType()
export class editBlogDTO extends addBlogDTO {
  @Field()
  _id: string;
}

@InputType()
export class statusChangeDTO {
  @Field((type) => [String])
  ids: string[];

  @Field()
  status: number;
}

@InputType()
export class listingBlogDTO {
  @Field((type) => [String], { nullable: true })
  blogIds?: string[];

  @Field()
  searchingText: string;

  @Field((type) => [Number], { defaultValue: [1, 2, 0] })
  statusArray: number[];

  @Field({ defaultValue: 10 })
  limit: number;

  @Field({ defaultValue: 0 })
  skip: number;

  @Field({ defaultValue: 0 })
  sortType: number;

  @Field({ defaultValue: 1 })
  sortOrder: number;
}
// responses
@ObjectType()
export class GeneralResponse {
  @Field()
  message: string;
}

@ObjectType()
export class AddBlogResponse extends GeneralResponse {
  @Field({ nullable: true })
  data?: Blog;
}

@ObjectType()
export class EditBlogResponse extends GeneralResponse {
  @Field({ nullable: true })
  data?: Blog;
}
@ObjectType()
class dataBlog {
  @Field((type) => [Blog], { nullable: true })
  list: Blog[];
}
@ObjectType()
export class ListingBlogResponse extends GeneralResponse {
  @Field()
  data?: dataBlog;
}
