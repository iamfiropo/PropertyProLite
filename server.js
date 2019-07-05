import express from 'express';
import logger from 'morgan';
import Debug from 'debug';
import { config } from 'dotenv';
import 'regenerator-runtime/runtime';
import './server/config/cloudinary';
import Route from './server/routes/route';

config();

const app = express();

app.use(logger('dev'));
const debug = Debug('http');
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = express.Router();
app.use('/api/v1', Route(logger, router));

app.listen(port, () => debug(`Server listening on port ${port}`));

export default app;
