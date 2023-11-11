import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {  ListingBlogCatResponse, addBlogCategoryDTO, addBlogCategoryResponse, editBlogCategoryDTO, listingBlogCatDTO } from './blog_category.dto';
import { BlogCategoryService } from './blog_category.service';
import { GeneralResponse, statusChangeDTO } from '../blog/blog.dto';
import { BlogCategory } from 'src/models.graphql';

@Resolver(of=> BlogCategory )
export class BlogCategoryResolver {
constructor(private readonly blogCategoryService:BlogCategoryService){}
    @Mutation(()=>addBlogCategoryResponse)
    async addCategory(@Args("categoryData") addCategoryDTO:addBlogCategoryDTO){
   
       return this.blogCategoryService.addCategoryService(addCategoryDTO)
    }

    @Mutation(()=>addBlogCategoryResponse)
    async editCategory(@Args("categoryData") addCategoryDTO:editBlogCategoryDTO){
   
       return this.blogCategoryService.editCategoryService(addCategoryDTO)
    }


    @Mutation(()=>GeneralResponse)
    statusChange(@Args("statusChangeDTO") dto: statusChangeDTO) {
      return this.blogCategoryService.statusChangeService(dto);
    }
  
    @Query(()=>ListingBlogCatResponse)
    listBlogCategory(@Args("listingBlogCat") Dto: listingBlogCatDTO) {
      return this.blogCategoryService.blogListService(Dto);
    }
}
