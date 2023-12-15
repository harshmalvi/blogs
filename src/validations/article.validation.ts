import { Joi } from 'celebrate';

const addArticleSchema = {
  body: {
    nickname: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required()
  }
};

const addArticleCommentSchema = {
  params: {
    id: Joi.number().required()
  },
  body: {
    nickname: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    parent_comment_id: Joi.number().optional()
  }
};

const addChildCommentSchema = {
  params: {
    id: Joi.number().required()
  },
  body: {
    nickname: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    parent_comment_id: Joi.number().required()
  }
};

const querySchema = {
  query: {
    page: Joi.number().allow('', null),
    size: Joi.number().allow('', null)
  }
};

export default {
  addArticleSchema,
  addArticleCommentSchema,
  addChildCommentSchema,
  querySchema
};
