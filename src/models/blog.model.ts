
import mongoose from 'mongoose';


export const blogSchema = new mongoose.Schema({
  _name: { type: String, required: true, default: '' },
  _content: { type: String, required: true, default: '' },
  _blog_category: {
    type: mongoose.Types.ObjectId,
    ref: "blog_categories",
    default: null,
  },
  _createdAt: { type: Number, required: true, default: Date.now() },
  _status: { type: Number, enum: [-1, 0, 1, 2], default: -1, required: true },
  _description:{ type: String, required: true, default: '' }
});

export interface Blog{
  _name:string,
  _content:string,
  _createdAt: number,
  _description:string
  _status: -1| 0| 1| 2 | number,
  _blog_category:string
}



blogSchema.post('save', async (err, doc, next) => {
  schemaPostFunctionForDuplicate(err, doc, next);
});
blogSchema.post('insertMany', async (err, doc, next) => {
  schemaPostFunctionForDuplicate(err, doc, next);
});
blogSchema.post('updateMany', async (err, doc, next) => {
  schemaPostFunctionForDuplicate(err, doc, next);
});
blogSchema.post('updateOne', async (err, doc, next) => {
  schemaPostFunctionForDuplicate(err, doc, next);
});
blogSchema.post('findOneAndUpdate', async (err, doc, next) => {
  schemaPostFunctionForDuplicate(err, doc, next);
});

function schemaPostFunctionForDuplicate(error, doc, next) {
  if (error.code == 11000) {
    next(new Error('Blog already existing'));
  } else {
    next();
  }
}

