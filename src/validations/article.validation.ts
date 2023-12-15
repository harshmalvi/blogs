import { Joi } from 'celebrate';

const addArticleSchema = {
  body: {
    nickname: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required()
  }
};

export default {
  addArticleSchema
};
