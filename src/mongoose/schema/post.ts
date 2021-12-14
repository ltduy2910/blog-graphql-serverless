import mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
PostSchema.index({ title: "text", content: "text" }, { weights: { title: 5, body: 3, } })

export default PostSchema

