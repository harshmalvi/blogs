import dotenv from 'dotenv';
import express from 'express';

import routes from './http';
import { apiResponseHandler, errorHandler } from './http/middleware/apiResponse.middleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// api routes
app.use('/', apiResponseHandler, routes)
// error handling
app.use(errorHandler)
app.use((req, res) => {
  return res.status(404).json({ message: 'Route not found.' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
