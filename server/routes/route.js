import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user.middleware';
import PropertyController from '../controllers/property.controller';
import PropertyMiddleware from '../middlewares/property.middleware';

const Route = (logger, router) => {
  router.post('/auth/signup', UserMiddleware.signUp, UserController.signUp);
  router.post('/auth/signin', UserMiddleware.signIn, UserController.signIn);
  router.post('/property', PropertyMiddleware.property, PropertyController.create);
  router.get('/property', PropertyController.findAll);
  router.get('/property/:id', PropertyController.findOne);
  router.get('/properties', PropertyMiddleware.findByType, PropertyController.findByType);
  // router.patch('/property/:id', PropertyController.update);
  // router.patch('/property/:id/sold', PropertyController.updateSold);
  router.delete('/property/:id', PropertyController.deleteProperty);
  return router;
};

export default Route;
