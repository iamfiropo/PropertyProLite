import express from 'express';
import logger from 'morgan';
import Debug from 'debug';
import dotenv from 'dotenv';
import './server/config/cloudinary';

dotenv.config();

const app = express();

app.use(logger('dev'));
const debug = Debug('http');
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200)
  .send({ message: 'Welcome to PropertyProLite API' }));

app.listen(port, () => debug(`Server listening on port ${port}`));

export default app;
