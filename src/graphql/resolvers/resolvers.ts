import { GraphQLResolveInfo } from 'graphql';
import { IResolvers } from '@graphql-tools/utils';
import Context from '../../mongoose/schema/context';
import { PostModel } from '../../mongoose';



const resolvers: IResolvers = {
  Query: {
    post: async (_root: void, { postId }: { postId: string }, _ctx: Context, _info: GraphQLResolveInfo) => {
      try {
        const post = await PostModel.findById(postId)
        return {
          code: 200,
          success: true,
          message: "Get post successfully!",
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
    posts: async (_root: void, _args: any, _ctx: Context, _info: GraphQLResolveInfo) => {
      try {
        const posts = await PostModel.find({});
        return {
          code: 200,
          success: true,
          message: "Get posts successfully!",
          posts: posts
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
  },

};

export default resolvers;