import express from 'express';
import logger from 'morgan';
import Debug from 'debug';
import cors from 'cors';
import { config } from 'dotenv';
import fileUpload from 'express-fileupload';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import 'regenerator-runtime/runtime';
import './server/config/cloudinary';
import Route from './server/routes/route';
import options from './docs/swagger';

config();

const app = express();

app.use(logger('dev'));
const debug = Debug('http');
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
  useTempFiles: true,
  safeFileNames: true,
  preserveExtension: true
}));

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to PropertyProLite API',
  });
});

const router = express.Router();
app.use('/api/v1', Route(logger, router));

const swaggerSpec = swaggerJSDoc(options);
app.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Page not found',
  });
});

app.listen(port, () => debug(`Server listening on port ${port}`));

export default app;
