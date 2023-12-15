import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import Article from '../src/db/models/article';
import ArticleComment from '../src/db/models/article_comments';

chai.use(chaiHttp);
const { expect } = chai;

describe('ArticleCommentController', () => {
  afterEach(async () => {
    // Use a test database before each test
    await Article.destroy({ where: {} });
    await ArticleComment.destroy({ where: {} });
  });

  describe('POST /articles/:id/comments', () => {
    it('should create a new article comment', async () => {
      // Create a test article in the database
      const createdArticle = await Article.create({
        title: 'Test Article',
        content: 'Test Content',
        nickname: 'user1',
      });

      // Make a POST request to the endpoint
      const res = await chai.request(app).post(`/articles/${createdArticle.id}/comments`).send({
        nickname: 'user1',
        content: 'New Comment',
      });

      // Assertions
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.content).to.equal('New Comment');
    });

    it('should return 404 if article is not found', async () => {
      // Make a POST request to the endpoint with an invalid article ID
      const res = await chai.request(app).post('/articles/999/comments').send({
        nickname: 'user1',
        content: 'New Comment',
      });

      // Assertions
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message').equal('Article Not Found');
    });
  });

  describe('POST /articles/:id/childcomments', () => {
    it('should create a child comment on an article comment', async () => {
      // Create a test article in the database
      const createdArticle = await Article.create({
        title: 'Test Article',
        content: 'Test Content',
        nickname: 'user1',
      });

      // Create a test parent comment on the article in the database
      const parentComment = await ArticleComment.create({
        article_id: createdArticle.id,
        nickname: 'user1',
        content: 'Parent Comment',
      });

      // Make a POST request to the endpoint
      const res = await chai.request(app).post(`/articles/${createdArticle.id}/childcomments`).send({
        parent_comment_id: parentComment.id,
        nickname: 'user2',
        content: 'Child Comment',
      });

      // Assertions
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.content).to.equal('Child Comment');
    });

    it('should return 404 if article is not found', async () => {
      // Create a test parent comment in the database
      const parentComment = await ArticleComment.create({
        article_id: 999, // Invalid article ID
        nickname: 'user1',
        content: 'Parent Comment',
      });

      // Make a POST request to the endpoint with an invalid article ID
      const res = await chai.request(app).post(`/articles/999/childcomments`).send({
        parent_comment_id: parentComment.id,
        nickname: 'user2',
        content: 'Child Comment',
      });

      // Assertions
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message').equal('Article Not Found');
    });

    it('should return 404 if parent comment is not found', async () => {
      // Create a test article in the database
      const createdArticle = await Article.create({
        title: 'Test Article',
        content: 'Test Content',
        nickname: 'user1',
      });

      // Make a POST request to the endpoint with an invalid parent comment ID
      const res = await chai.request(app).post(`/articles/${createdArticle.id}/childcomments`).send({
        parent_comment_id: 999, // Invalid parent comment ID
        nickname: 'user2',
        content: 'Child Comment',
      });

      // Assertions
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message').equal('Article Parent Comment Not Found');
    });
  });

  describe('GET /articles/:id/comments', () => {
    it('should get all comments on an article', async () => {
      // Create a test article in the database
      const createdArticle = await Article.create({
        title: 'Test Article',
        content: 'Test Content',
        nickname: 'user1',
      });

      // Create test comments on the article in the database
      await ArticleComment.bulkCreate([
        { article_id: createdArticle.id, nickname: 'user1', content: 'Comment 1' },
        { article_id: createdArticle.id, nickname: 'user2', content: 'Comment 2' },
      ]);

      // Make a GET request to the endpoint
      const res = await chai.request(app).get(`/articles/${createdArticle.id}/comments`);

      // Assertions
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.rows).to.have.lengthOf(2);
    });

    it('should get comments with pagination', async () => {
      // Create a test article in the database
      const createdArticle = await Article.create({
        title: 'Test Article',
        content: 'Test Content',
        nickname: 'user1',
      });

      // Create test comments on the article in the database
      await ArticleComment.bulkCreate([
        { article_id: createdArticle.id, nickname: 'user1', content: 'Comment 1' },
        { article_id: createdArticle.id, nickname: 'user2', content: 'Comment 2' },
        { article_id: createdArticle.id, nickname: 'user3', content: 'Comment 3' },
      ]);

      // Make a GET request with pagination parameters
      const res = await chai.request(app).get(`/articles/${createdArticle.id}/comments`).query({
        page: 2,
        size: 1,
      });

      // Assertions
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.rows).to.have.lengthOf(1);
      expect(res.body.data.rows[0].content).to.equal('Comment 2');
    });
  });
});
