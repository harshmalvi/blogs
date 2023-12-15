import { Request, Response } from 'express';

import ArticleComment from '../db/models/article_comments';
import messageConstant from '../constants/message.constant';
import httpStatusConstant from '../constants/httpStatus.constant';
import schemaConstant from '../constants/schema.constant';
import { ISortingType } from '../interface/common.interface';
import Article from '../db/models/article';

class ArticleCommentController {
  // Create Article Comment
  public async createArticleComment(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const {
        body: { nickname, content, parent_comment_id },
        params: { id }
      } = req;

      const isArticleExists = await Article.findOne({
        where: { id }
      });

      if(!isArticleExists) {
        return res.failResponse(
          httpStatusConstant.NOT_FOUND,
          messageConstant.ARTICLE_NOT_FOUND,
        );
      }

      const article = await ArticleComment.create({
        article_id: id,
        nickname,
        content,
        parent_comment_id
      });
      res.successResponse(
        httpStatusConstant.OK,
        messageConstant.SUCCESS,
        article
      );
    } catch (error) {
      console.log(error);
      res.failResponse(
        httpStatusConstant.INTERNAL_SERVER_ERROR,
        messageConstant.ERROR,
        messageConstant.INTERNAL_SERVER_ERROR
      );
    }
  }

  // List ALL Comments On Article
  public async getCommentsByArticleId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const {
        params: { id }
      } = req;
      const {
        page = schemaConstant.pagination.DEFAULT_PAGE,
        size = schemaConstant.pagination.DEFAULT_SIZE,
        sortBy = schemaConstant.pagination.DEFAULT_SORTBY,
        orderBy = schemaConstant.pagination.DEFAULT_ORDER
      } = req.query as unknown as ISortingType;
      const skip = (page - 1) * size;

      const articles = await ArticleComment.findAndCountAll({
        limit: size,
        offset: skip,
        where: { article_id: id },
        include: [
          {
            model: ArticleComment,
            as: 'childComments',
            required: false
          },
        ],
        order: [[sortBy, orderBy]]
      });
      res.successResponse(
        httpStatusConstant.OK,
        messageConstant.SUCCESS,
        articles
      );
    } catch (error) {
      console.log(error)
      res.failResponse(
        httpStatusConstant.INTERNAL_SERVER_ERROR,
        messageConstant.ERROR,
        messageConstant.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Create Comment on Article Comment
  public async createChildComment(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const {
        body: { nickname, content, parent_comment_id },
        params: { id }
      } = req;

      const isArticleExists = await Article.findOne({
        where: { id }
      });

      if(!isArticleExists) {
        return res.failResponse(
          httpStatusConstant.NOT_FOUND,
          messageConstant.ARTICLE_NOT_FOUND,
        );
      }

      const isArticleParentCommentExists = await ArticleComment.findOne({
        where: { id: parent_comment_id }
      });

      if(!isArticleParentCommentExists) {
        return res.failResponse(
          httpStatusConstant.NOT_FOUND,
          messageConstant.ARTICLE_PARENT_COMMENT_NOT_FOUND,
        );
      }

      const article = await ArticleComment.create({
        article_id: id,
        nickname,
        content,
        parent_comment_id
      });
      res.successResponse(
        httpStatusConstant.OK,
        messageConstant.SUCCESS,
        article
      );
    } catch (error) {
      console.log(error);
      res.failResponse(
        httpStatusConstant.INTERNAL_SERVER_ERROR,
        messageConstant.ERROR,
        messageConstant.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new ArticleCommentController();
