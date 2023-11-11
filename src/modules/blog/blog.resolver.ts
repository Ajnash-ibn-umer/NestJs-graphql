import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AddBlogResponse, EditBlogResponse, GeneralResponse, ListingBlogResponse, addBlogDTO, editBlogDTO, listingBlogDTO, statusChangeDTO } from './blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BlogService } from './blog.service';
import { Blog } from 'src/models.graphql';
import getProjection from "src/utils/projection"
import { GraphQLResolveInfo } from 'graphql';
import { NextFunction } from 'express';
@Resolver((of) => Blog)
export class BlogResolver {
  constructor(private blogService: BlogService) {}


  @Query(() => String)

  async ping(@Args('name') name: string) {
    return 'hello world ' + name;
  }

  @Mutation(() => AddBlogResponse,{description:"add blogs ",name:"CreateNewBlog"})

  async addBlog(@Args('addBlogDTO') addBlogDTO: addBlogDTO) {
    return this.blogService.addBlogService(addBlogDTO);
  }

  @Mutation(()=>EditBlogResponse)
  editBlog(@Args('editBlogDTO') dto: editBlogDTO) {
    return this.blogService.editBlogService(dto);
  }

  @Mutation(()=>GeneralResponse)
  statusChange(@Args("statusChangeDTO") dto: statusChangeDTO) {
    return this.blogService.statusChangeService(dto);
  }
  @ResolveField("post",()=>Blog)
  delete(@Parent() blog: Blog) {
    return {}
  }
  @Query(()=>ListingBlogResponse)
  list(@Args("listingBlog") Dto: listingBlogDTO,@Info() info:GraphQLResolveInfo) {
 
    const projection = getProjection(info.fieldNodes[0]);
    console.log({projection:projection.data});
    
    return this.blogService.blogListService(Dto,projection.data);
  }
}
