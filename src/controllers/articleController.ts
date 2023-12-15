import { Request, Response } from 'express';

import Article from '../db/models/article';
import messageConstant from '../constants/message.constant';
import httpStatusConstant from '../constants/httpStatus.constant';
import schemaConstant from '../constants/schema.constant';
import { ISortingType } from '../interface/common.interface';
import ArticleComment from '../db/models/article_comments';

class ArticleController {
  // List Articles
  public async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = schemaConstant.pagination.DEFAULT_PAGE,
        size = schemaConstant.pagination.DEFAULT_SIZE,
        sortBy = schemaConstant.pagination.DEFAULT_SORTBY,
        orderBy = schemaConstant.pagination.DEFAULT_ORDER
      } = req.query as unknown as ISortingType;
      const skip = (page - 1) * size;

      const articles = await Article.findAndCountAll({
        limit: size,
        offset: skip,
        order: [[sortBy, orderBy]]
      });
      res.successResponse(
        httpStatusConstant.OK,
        messageConstant.SUCCESS,
        articles
      );
    } catch (error) {
      res.failResponse(
        httpStatusConstant.INTERNAL_SERVER_ERROR,
        messageConstant.ERROR,
        messageConstant.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get Article
  public async getArticleById(req: Request, res: Response): Promise<void> {
    try {
      const {
        params: { id }
      } = req;

      const article = await Article.findOne({
        include: [
          {
            model: ArticleComment,
            as: 'comments',
            include: [
              {
                model: ArticleComment,
                as: 'childComments',
              },
            ],
          },
        ],
        where: { id },
      });

      // Checks article exists or not
      if(!article) {
        return res.failResponse(
          httpStatusConstant.NOT_FOUND,
          messageConstant.ARTICLE_NOT_FOUND,
        );
      }

      res.successResponse(
        httpStatusConstant.OK,
        messageConstant.SUCCESS,
        article
      );
    } catch (error) {
      res.failResponse(
        httpStatusConstant.INTERNAL_SERVER_ERROR,
        messageConstant.ERROR,
        messageConstant.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Create Article
  public async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const {
        body: { nickname, title, content }
      } = req;

      const article = await Article.create({
        nickname,
        title,
        content
      });
      res.successResponse(
        httpStatusConstant.OK,
        messageConstant.SUCCESS,
        article
      );
    } catch (error) {
      res.failResponse(
        httpStatusConstant.INTERNAL_SERVER_ERROR,
        messageConstant.ERROR,
        messageConstant.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default new ArticleController();
