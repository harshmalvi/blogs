import express from 'express';
import { celebrate } from 'celebrate';

import articleValidation from '../../validations/article.validation';
import articleController from '../../controllers/articleController';
import articleCommentController from '../../controllers/articleCommentController';

const router = express.Router();

router.get('/', celebrate(articleValidation.querySchema), articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', celebrate(articleValidation.addArticleSchema), articleController.createArticle);

router.post('/:id/comments', celebrate(articleValidation.addArticleCommentSchema), articleCommentController.createArticleComment);
router.post('/:id/childcomments', celebrate(articleValidation.addChildCommentSchema), articleCommentController.createChildComment);
router.get('/:id/comments', celebrate(articleValidation.querySchema), articleCommentController.getCommentsByArticleId);

export default router;
