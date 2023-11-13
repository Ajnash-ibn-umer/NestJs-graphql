import { Injectable } from '@nestjs/common';
import { addBlogCategoryDTO, editBlogCategoryDTO, listingBlogCatDTO } from './blog_category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BlogCat } from '../../models/blog_category.model';
import mongoose, { Model } from 'mongoose';
import { statusChangeDTO } from '../blog/blog.dto';
import { responseFormat } from '../../utils/projection';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectModel('blog_categories') private blogCatSchema: Model<BlogCat>,
  ) {}
  async addCategoryService(dto: addBlogCategoryDTO) {
    try {
      const newBlogCat = await new this.blogCatSchema({
        _name: dto._name,
        _priority: dto._priority,
        // _globalGalleryId: globalGalleryId,
        _createdAt: Date.now(),
        _status: 1,
      }).save();

      return {
        message: 'success',
        data: newBlogCat,
      };
    } catch (error) {
      throw error;
    }
  }

  async editCategoryService(dto: editBlogCategoryDTO) {
    try {
      const upBlogCat = await this.blogCatSchema.findOneAndUpdate(
        { _id: dto._id },
        {
          $set: {

            _name: dto._name,
            _priority: dto._priority,
            // _globalGalleryId: globalGalleryId,
            _createdAt: Date.now(),
            _status: 1,
            _updatedAt: -1,
          },
        },
        { new: true}
      );

      return {
        message: 'success',
        data: upBlogCat,
      };
    } catch (error) {
      throw error;
    }
  }

  async statusChangeService(dto: statusChangeDTO) {
    try {
      var result = await this.blogCatSchema.updateMany(
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


  async blogListService(dto: listingBlogCatDTO) {
    try {
      const blogCategoryAggregationArray = [];

 
      if (dto.searchingText !== '') {
        blogCategoryAggregationArray.push({
          $match: {
            $or: [
              { _name: new RegExp(dto.searchingText, 'i') },
              { _content: new RegExp(dto.searchingText, 'i') },
            ],
          },
        });
      }

      blogCategoryAggregationArray.push({
        $match: {
          _status: { $in: dto.statusArray },
        },
      });

      if (dto.blogCatIds && dto.blogCatIds.length > 0) {
        const ids = dto.blogCatIds.map(
          (value, idx) => new mongoose.Types.ObjectId(value),
        );

        blogCategoryAggregationArray.push({
          $match: {
            _id: { $in: ids },
          },
        });
      }
      if (dto.skip != -1) {
        blogCategoryAggregationArray.push({
          $skip: dto.skip,
        });

        blogCategoryAggregationArray.push({
          $limit: dto.limit,
        });
      }
      switch (dto.sortType) {
        case 0:
          blogCategoryAggregationArray.push({
            $sort: {
              _createdAt: dto.sortOrder,
              _id: dto.sortOrder,
            },
          });
          break;

        case 1:
          blogCategoryAggregationArray.push({
            $sort: {
              _name: dto.sortOrder,
              _id: dto.sortOrder,
            },
          });
          break;
        case 2:
          blogCategoryAggregationArray.push({
            $sort: {
              _status: dto.sortOrder,
              _id: dto.sortOrder,
            },
          });
          break;
      }
 

      console.log(blogCategoryAggregationArray);
      const blogs = await this.blogCatSchema.aggregate(blogCategoryAggregationArray).exec();
      console.log({ blogs });

      return {
        message: 'success',
        data: { list: blogs },
      };
    } catch (error) {
      throw error;
    }
  }
}
