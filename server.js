import express from 'express';
import logger from 'morgan';
import Debug from 'debug';
import cors from 'cors';
import { config } from 'dotenv';
import 'regenerator-runtime/runtime';
import './server/config/cloudinary';
import Route from './server/routes/route';

config();

const app = express();

app.use(logger('dev'));
const debug = Debug('http');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to PropertyProLite API',
  });
});

const router = express.Router();
app.use('/api/v1', Route(logger, router));

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Page not found',
  });
});

app.listen(port, () => debug(`Server listening on port ${port}`));

export default app;
