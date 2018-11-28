import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import blogPostType from '../../types/blog-post';
import getProjection from '../../get-projection';
import BlogPostModel from '../../../models/blog-post';

export default {
  type: blogPostType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, context, info) {
    const projection = getProjection(info.fieldNodes[0]);
    const removedBlogPost = await BlogPostModel
      .findByIdAndRemove(params._id, {
        select: projection
      })
      .exec();

    if (!removedBlogPost) {
      throw new Error('Error removing blog post');
    }

    return removedBlogPost;
  }
};
