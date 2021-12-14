import mongoose = require('mongoose');

import environment from '../config/environment'
import PostSchema from './schema/post';
const env = process.env.NODE_ENV || "development";


const prodMongoURL = `mongodb+srv://${environment.mongodb.user}:${environment.mongodb.password}@${environment.mongodb.uri}/${environment.mongodb.dbName}?retryWrites=true&w=majority`
const mongoURL = env === 'devlopment' ? `mongodb://localhost:27017/${environment.mongodb.dbName}}` : prodMongoURL;

mongoose.connect(mongoURL).then(() => {
  console.log('Connected to MongoDb');
}).catch((err: Error) => {
  throw `There is error in connecting Mongo DB ${err.message} `;
});

const UserModel = mongoose.model("User", PostSchema, 'users')
const PostModel = mongoose.model("Post", PostSchema, 'posts')
const CommentModel = mongoose.model("Comment", PostSchema, 'comments')

export { UserModel, PostModel, CommentModel }