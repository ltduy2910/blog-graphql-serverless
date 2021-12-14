import mongoose = require('mongoose');
import DataLoader from 'dataloader';

import environment from '../config/environment'
import PostSchema from './schema/post';
import UserSchema from './schema/user';
import CommentSchema from './schema/comment';
const env = process.env.NODE_ENV || "development";

const prodMongoURL = `mongodb+srv://${environment.mongodb.user}:${environment.mongodb.password}@${environment.mongodb.uri}/${environment.mongodb.dbName}?retryWrites=true&w=majority`
const mongoURL = env === 'development' ? `mongodb://localhost:27017/${environment.mongodb.dbName}` : prodMongoURL;

// Connet to MongoDB
mongoose.connect(mongoURL).then(() => {
  console.log('Connected to MongoDb');
}).catch((err: Error) => {
  throw `There is error in connecting Mongo DB ${err.message} `;
});

// Models
const UserModel = mongoose.model("User", UserSchema, 'users')
const PostModel = mongoose.model("Post", PostSchema, 'posts')
const CommentModel = mongoose.model("Comment", CommentSchema, 'comments')
//Data loaders
const getUserLoader = () => new DataLoader((userIds) => {
  return UserModel.find({ _id: { $in: userIds } }).exec()
})
const getPostLoader = () => new DataLoader((postIds) => {
  return PostModel.find({ _id: { $in: postIds } })
})

export { UserModel, getUserLoader, PostModel, getPostLoader, CommentModel }