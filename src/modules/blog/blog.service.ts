import { Injectable } from '@nestjs/common';
import {
  addBlogDTO,
  editBlogDTO,
  listingBlogDTO,
  statusChangeDTO,
} from './blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Blog } from 'src/models/blog.model';
import { responseFormat } from 'src/utils/projection';

@Injectable()
export class BlogService {
  constructor(@InjectModel('blogs') private readonly blogModel: Model<Blog>) {}
  async addBlogService(dto: addBlogDTO) {
    const newBlog = await new this.blogModel({
      _content: dto._content,
      _description: dto._description,
      _createdAt: Date.now(),
      _name: dto._name,
      _status: 1,
    }).save();
    console.log({ newBlog });

    return {
      message: 'Success',
      data: newBlog,
    };
  }

  async editBlogService(dto: editBlogDTO) {
    const newBlog = await this.blogModel.findOneAndUpdate(
      {
        _id: dto._id,
      },
      {
        $set: {
          _content: dto._content,
          _createdAt: Date.now(),
          _name: dto._name,
          _status: 1,
        },
      },
      { new: true },
    );
    return {
      message: 'Success edit',
      data: newBlog,
    };
  }

  async statusChangeService(dto: statusChangeDTO) {
    try {
      var result = await this.blogModel.updateMany(
        {
          _id: { $in: dto.ids },
        },
        {
          $set: {
            _status: dto.status,
          },
        },
        { new: true },
      );

      return { message: 'success' };
    } catch (error) {
      throw error;
    }
  }

  async blogListService(dto: listingBlogDTO,projection) {
    try {
      const blogAggregationArray = [];



      if (dto.searchingText !== '') {
        blogAggregationArray.push({
          $match: {
            $or: [
              { _name: new RegExp(dto.searchingText, 'i') },
              { _content: new RegExp(dto.searchingText, 'i') },
            ],
          },
        });
      }

      blogAggregationArray.push({
        $match: {
          _status: { $in: dto.statusArray },
        },
      });

      if (dto.blogIds && dto.blogIds.length > 0) {
        const ids = dto.blogIds.map(
          (value, idx) => new mongoose.Types.ObjectId(value),
        );

        blogAggregationArray.push({
          $match: {
            _id: { $in: ids },
          },
        });
      }
      if (dto.skip != -1) {
        blogAggregationArray.push({
          $skip: dto.skip,
        });

        blogAggregationArray.push({
          $limit: dto.limit,
        });
      }

      blogAggregationArray.push(responseFormat(projection.list))
      switch (dto.sortType) {
        case 0:
          blogAggregationArray.push({
            $sort: {
              _createdAt: dto.sortOrder,
              _id: dto.sortOrder,
            },
          });
          break;

        case 1:
          blogAggregationArray.push({
            $sort: {
              _name: dto.sortOrder,
              _id: dto.sortOrder,
            },
          });
          break;
        case 2:
          blogAggregationArray.push({
            $sort: {
              _status: dto.sortOrder,
              _id: dto.sortOrder,
            },
          });
          break;
      }
      console.log( "cat",projection.list._blog_categoryDetails);
      
 if(projection.list._blog_categoryDetails  ){
  console.log("in pipiline");
  
  blogAggregationArray.push(
    {
      $lookup: {
        from: 'blog_categories',
        let: { id: '$_blog_category' },
        pipeline: [
          {
            $match: {
              $expr: [{ $eq: ['$_id', '$$id'] }],
            },
          },
          responseFormat(projection.list._blog_categoryDetails)
        ],
        as: '_blog_categoryDetails',
      },
    },
    {
      $unwind: {
        path: '$_blog_categoryDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
  )
 }

      console.log(blogAggregationArray);
      const blogs = await this.blogModel.aggregate(blogAggregationArray).exec();
      console.log({ ...blogs });

      return {
        message: 'success',
        data: { list: blogs },
      };
    } catch (error) {
      throw error;
    }
  }
}
