import mongoose from 'mongoose';

export const blogCatSchema = new mongoose.Schema({
  _name: { type: String, required: true, index: true },
  _priority: { type: Number, default: 0 },
  _createdAt: { type: Number, required: true, default: Date.now() },
  _status: { type: Number, enum: [-1, 0, 1, 2], default: -1, required: true },
});

//interface
export interface BlogCat {
  _name: string;
  _priority: number;
  _status: number;
  _createdAt: number;
}

blogCatSchema.post('save', async (err, doc, next) => {
  schemaPostFunctionForDuplicate(err, doc, next);
});
blogCatSchema.post('insertMany', async (err, doc, next) => {
  schemaPostFunctionForDuplicate(err, doc, next);
});
blogCatSchema.post('updateMany', async (err, doc, next) => {
  schemaPostFunctionForDuplicate(err, doc, next);
});
blogCatSchema.post('updateOne', async (err, doc, next) => {
  schemaPostFunctionForDuplicate(err, doc, next);
});
blogCatSchema.post('findOneAndUpdate', async (err, doc, next) => {
  schemaPostFunctionForDuplicate(err, doc, next);
});

function schemaPostFunctionForDuplicate(error, doc, next) {
  if (error.code == 11000) {
    next(new Error('Category already existing'));
  } else {
    next();
  }
}
