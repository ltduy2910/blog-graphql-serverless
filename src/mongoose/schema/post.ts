import mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default PostSchema

