import express from 'express';
import articleController from '../../controllers/articleController';

const router = express.Router();

router.get('/', articleController.getAllArticles);

export default router;
