import { Request, Response } from 'express';

import Artice from '../db/models/article';
import messageConstant from '../constants/message.constant';
import httpStatusConstant from '../constants/httpStatus.constant';
import schemaConstant from '../constants/schema.constant';
import { ISortingType } from '../interface/common.interface';

class ArticleController {
  public async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const {
        page = schemaConstant.pagination.DEFAULT_PAGE,
        size = schemaConstant.pagination.DEFAULT_SIZE,
        sortBy = schemaConstant.pagination.DEFAULT_SORTBY,
        orderBy = schemaConstant.pagination.DEFAULT_ORDER,
      } = req.query as unknown as ISortingType
      const skip = (page - 1) * size

      const articles = await Artice.findAndCountAll({
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
}

export default new ArticleController();
