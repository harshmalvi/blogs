import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import Article from '../src/db/models/article';

chai.use(chaiHttp);
chai.use(chaiHttp);
const { expect } = chai;

describe('ArticleController', () => {
  afterEach(async () => {
    // Use a test database before each test
    await Article.destroy({ where: {} });
  });

  describe('GET /articles', () => {
    it('should get all articles', async () => {
      // Create test articles in the database
      await Article.bulkCreate([
        { nickname: 'user1', title: 'Article 1', content: 'Content 1' },
        { nickname: 'user2', title: 'Article 2', content: 'Content 2' },
      ]);

      // Make a GET request to the endpoint
      const res = await chai.request(app).get('/articles');

      // Assertions
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.rows).to.have.lengthOf(2);
    });

    it('should get articles with pagination', async () => {
      // Create test articles in the database
      await Article.bulkCreate([
        { nickname: 'user1', title: 'Article 1', content: 'Content 1' },
        { nickname: 'user2', title: 'Article 2', content: 'Content 2' },
        { nickname: 'user3', title: 'Article 3', content: 'Content 3' },
      ]);

      // Make a GET request with pagination parameters
      const res = await chai.request(app).get('/articles').query({
        page: 2,
        size: 1,
      });

      // Assertions
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.rows).to.have.lengthOf(1);
      expect(res.body.data.rows[0].title).to.equal('Article 2');
    });
  });

  describe('GET /articles/:id', () => {
    it('should get a single article by ID', async () => {
      // Create a test article in the database
      const createdArticle = await Article.create({
        nickname: 'user1',
        title: 'Test Article',
        content: 'Test Content',
      });

      // Make a GET request to the endpoint
      const res = await chai.request(app).get(`/articles/${createdArticle.id}`);

      // Assertions
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.id).to.equal(createdArticle.id);
    });

    it('should return 404 if article is not found', async () => {
      // Make a GET request with an invalid ID
      const res = await chai.request(app).get('/articles/999');

      // Assertions
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message').equal('Article Not Found');
    });
  });

  describe('POST /articles', () => {
    it('should create a new article', async () => {
      // Make a POST request to the endpoint
      const res = await chai.request(app).post('/articles').send({
        nickname: 'user1',
        title: 'New Article',
        content: 'New Content',
      });

      // Assertions
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data.title).to.equal('New Article');
    });

    it('should handle validation errors', async () => {
      // Make a POST request with missing required fields
      const res = await chai.request(app).post('/articles').send({
        nickname: 'user1',
        // Missing title and content
      });

      // Assertions
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message').equal('title is required');
    });
  });
});