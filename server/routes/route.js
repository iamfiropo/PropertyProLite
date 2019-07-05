import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user.middleware';
import PropertyController from '../controllers/property.controller';
import PropertyMiddleware from '../middlewares/property.middleware';

const Route = (logger, router) => {
  router.post('/auth/signup', UserMiddleware.signUp, UserController.signUp);
  router.post('/auth/signin', UserMiddleware.signIn, UserController.signIn);
  router.post('/property', PropertyMiddleware.property, PropertyController.create);
  return router;
};

export default Route;
