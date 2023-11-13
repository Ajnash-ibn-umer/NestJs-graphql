import { Field, ID, ObjectType } from '@nestjs/graphql';
import { truncate } from 'fs';

@ObjectType('BlogCategory', { description: 'Blog category schema' })

export class BlogCategory {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  _name: string;

  @Field({ nullable: true })
  _priority: number;

  @Field({ nullable: true })
  _status: number;

  @Field({ nullable: true })
  _createdAt: number;
}

@ObjectType('Blog', { description: 'Blog based Quires and mutations' })
export class Blog {
  @Field()
  _id?: string;

  @Field()
  _name?: string;

  @Field()
  _description?: string;

  @Field()
  _createdAt?: string;

  @Field()
  _content?: string;

  @Field()
  _status?: number;

  @Field((type) => BlogCategory, { nullable: true })
  _blog_categoryDetails: BlogCategory;

  @Field((type) => String, { nullable: true })
  _blog_category: string;
}
