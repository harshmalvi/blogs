import dotenv from 'dotenv';
import express from 'express';

import articleRoutes from './http/routes/article';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/articles', articleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
