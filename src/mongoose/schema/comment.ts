import mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default CommentSchema

