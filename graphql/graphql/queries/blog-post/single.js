import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import blogPostType from '../../types/blog-post';
import getProjection from '../../get-projection';
import BlogPostModel from '../../../models/blog-post';

export default {
  type: blogPostType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, context, info) {
    const projection = getProjection(info.fieldNodes[0]);
    return BlogPostModel
      .findById(params.id)
      .select(projection) // { _id: 1, title: 1, description: 1 }
      .exec();
  }
};
