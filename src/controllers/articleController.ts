import { Request, Response } from 'express';

import Artice from '../db/models/article';
import messageConstant from '../constants/message.constant'
import httpStatusConstant from '../constants/httpStatus.constant'


class ArticleController {
  public async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await Artice.findAll();
      res.status(httpStatusConstant.OK).json(articles);
    } catch (error) {
      res.status(httpStatusConstant.INTERNAL_SERVER_ERROR).json({ error: messageConstant.INTERNAL_SERVER_ERROR });
    }
  }
}

export default new ArticleController();
