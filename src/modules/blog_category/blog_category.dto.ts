import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { GeneralResponse } from '../blog/blog.dto';
import { BlogCategory } from 'src/models.graphql';



@ObjectType()
export class addBlogCategoryResponse extends GeneralResponse {
  @Field()
  data?: BlogCategory;
}

@InputType()
export class addBlogCategoryDTO {
  @Field()
  _name: string;

  @Field()
  _priority: number;

  @Field()
  _status: number;
}

@InputType()
export class editBlogCategoryDTO extends addBlogCategoryDTO {
  @Field()
  _id: string;
}


@InputType()
export class listingBlogCatDTO {
  @Field((type) => [String], { nullable: true })
  blogCatIds?: string[];

  @Field({nullable:true})
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

@ObjectType()
class dataBlogCat {
  @Field((type) => [BlogCategory], { nullable: true })
  list: BlogCategory[];
}
@ObjectType()
export class ListingBlogCatResponse extends GeneralResponse {
  @Field()
  data?: dataBlogCat;
}
