import express from 'express';
import { celebrate } from 'celebrate';

import articleValidation from '../../validations/article.validation';
import articleController from '../../controllers/articleController';

const router = express.Router();

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', celebrate(articleValidation.addArticleSchema), articleController.createArticle);

export default router;
