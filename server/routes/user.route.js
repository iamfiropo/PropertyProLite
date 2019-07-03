import UserController from '../controllers/user.controller';
import UserValidation from '../middlewares/user.validation';

const Route = (logger, router) => {
  router.post('/auth/signup', UserValidation.signUp, UserController.signUp);
  router.post('/auth/signin', UserValidation.signIn, UserController.signIn);
  return router;
};

export default Route;
