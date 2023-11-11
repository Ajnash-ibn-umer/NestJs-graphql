import { Module } from '@nestjs/common';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { blogSchema } from 'src/models/blog.model';
@Module({
  providers: [BlogResolver, BlogService],
  imports:[
    MongooseModule.forFeature([
      { name: "blogs", schema: blogSchema },

    ]),
  ]
})
export class BlogModule {}
