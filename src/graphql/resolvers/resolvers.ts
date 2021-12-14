import { GraphQLResolveInfo } from 'graphql';
import { IResolvers } from '@graphql-tools/utils';
import Context from '../../mongoose/schema/context';
import { CommentModel, PostModel, UserModel } from '../../mongoose';

const resolvers: IResolvers = {
  Query: {
    users: async (_root: void, _args: any, { userLoader: userLoader }) => {
      // Our loader can't get all users, so let's use the model directly here
      const allUsers = await UserModel.find({})
      // then tell the loader about the users we found
      for (const user of allUsers) {
        userLoader.prime(user._id, user);
      }
      // and finally return the result
      return allUsers
    },
    posts: async (_root: void, { searchString }, { postLoader: postLoader }, _info: GraphQLResolveInfo) => {
      try {
        const searchObject = searchString ?
          { "$or": [{ "title": { $regex: searchString } }, { "content": { $regex: searchString } }] } : {}

        console.log("searchString", searchObject)
        const posts = await PostModel.find(searchObject).populate({
          path: 'author',
          model: 'User',
        })
        for (const post of posts) {
          postLoader.prime(post._id, post);
        }
        return posts
      } catch (error) {
        console.log("error", error)
      }
    },
    post: async (_root: void, { postId }: { postId: string }, _ctx: Context, _info: GraphQLResolveInfo) => {
      try {
        const post = await PostModel.findById(postId).populate({
          path: 'author',
          model: 'User',
        }).populate({
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'author',
            model: 'User',
          },
        });
        return post
      } catch (error) {
        console.log("error", error)
      }
    },
  },
  Mutation: {
    addUser: async (_root: void, { inputUser }: any, _ctx: Context) => {
      try {
        console.log(inputUser)
        const user = await UserModel.create({ ...inputUser })
        return {
          code: 200,
          success: true,
          message: "Created user successfully.",
          user: user
        }
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error as string,
          post: null
        }
      }
    },
    addPost: async (_root: void, { inputPost }: any, _ctx: Context) => {
      try {
        1
        const { userId } = inputPost
        const user = await UserModel.findById(userId)
        const post = await PostModel.create({ author: user, ...inputPost })
        return {
          code: 200,
          success: true,
          message: "Created post successfully.",
          post: post
        }
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error as string,
          post: null
        }
      }
    },
    addComment: async (_root: void, { inputComment }: any, _ctx: Context) => {
      try {
        const { userId, postId, content } = inputComment
        const user = await UserModel.findById(userId)
        const post = await PostModel.findById(postId)
        const comment = await CommentModel.create({
          content: content,
          author: user,
          post: post
        })
        await PostModel.findOneAndUpdate(
          {
            _id: post._id
          },
          { $push: { comments: comment._id } },
          { new: true })
        return {
          code: 200,
          success: true,
          message: "Created comment successfully.",
          comment: comment
        }
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: error as string,
          comment: null
        }
      }
    }
  }
};

export default resolvers;
