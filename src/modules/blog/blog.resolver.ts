import {
  Args,
  Info,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  AddBlogResponse,
  EditBlogResponse,
  GeneralResponse,
  ListingBlogResponse,
  addBlogDTO,
  editBlogDTO,
  listingBlogDTO,
  statusChangeDTO,
} from './blog.dto';
import { BlogService } from './blog.service';
import { Blog } from 'src/models.graphql';
import getProjection from 'src/utils/projection';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import { NextFunction } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
@Resolver((of) => Blog)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query(() => String)
  async ping(@Args('name', { nullable: true }) name: string) {
    try {
      if (!name){
        throw new GraphQLError('Fatal error : name field must be string', {
          extensions: {
            code: HttpStatus.BAD_GATEWAY,
          }
        });
      }
     
      
      return 'hello world ' + name;
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => AddBlogResponse, {
    description: 'add blogs ',
    name: 'Blog_Create',
  })
  async addBlog(@Args('addBlogDTO') addBlogDTO: addBlogDTO) {
    return this.blogService.addBlogService(addBlogDTO);
  }

  @Mutation(() => EditBlogResponse, { name: 'Blog_Update' })
  async editBlog(@Args('editBlogDTO') dto: editBlogDTO) {
    return this.blogService.editBlogService(dto);
  }

  @Mutation(() => GeneralResponse)
  async statusChange(@Args('statusChangeDTO') dto: statusChangeDTO) {
    return this.blogService.statusChangeService(dto);
  }

  @Query(() => ListingBlogResponse)
  async list(
    @Args('listingBlog') Dto: listingBlogDTO,
    @Info() info: GraphQLResolveInfo,
  ) {
    const projection = getProjection(info.fieldNodes[0]);
    console.log({ projection: projection.data });

    return this.blogService.blogListService(Dto, projection.data);
  }
}
