import { Module } from '@nestjs/common';
import { BlogCategoryResolver } from './blog_category.resolver';
import { BlogCategoryService } from './blog_category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { blogCatSchema } from '../../models/blog_category.model';

@Module({
  providers: [BlogCategoryResolver, BlogCategoryService],
  imports:[
    MongooseModule.forFeature([{
      name:"blog_categories",
      schema: blogCatSchema
    }])
  ]
})
export class BlogCategoryModule {}
