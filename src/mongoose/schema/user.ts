import mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    photoUrl: {
      type: String,
    },
    provider: {
      type: String,
      required: true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default UserSchema